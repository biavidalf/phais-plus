import { PrismaClient } from "@prisma/client";
import axios, { AxiosError, AxiosInstance } from "axios";

const prisma = new PrismaClient();
const BULARIO_API_URL = "http://localhost:5000";
const PHAIS_PLUS_MEDICINE_API_URL = "http://localhost:3002";

interface CategoriesResponse {
  data: {
    categorias: {
      id: number;
      descricao: string;
      ativo: string;
    }[];
  };
}

interface MedicinesRequest {
  data: { content: { numProcesso: string }[] };
}

interface Presentation {
  codigo: number;
  restricaoPrescricao: string[];
}

interface Medicine {
  nomeComercial: string;
  categoriaRegulatoria: string;
  principioAtivo: string;
  classesTerapeuticas: string[];
  apresentacoes: Presentation[];
}

interface MedicineResponse {
  data: Medicine;
}

interface DatabaseMedicine {
  name: string;
  medicineType: string;
  activePrinciple: string;
  prescription: string;
  pharmacologicalGroups: string[];
}

async function getCategories(axiosInstance: AxiosInstance) {
  const {
    data: { categorias: categories },
  }: CategoriesResponse = await axiosInstance.get("/categorias");

  return categories;
}

async function getMedicinesByCategory(
  axiosInstance: AxiosInstance,
  categoryId: number
) {
  const {
    data: { content: medicines },
  }: MedicinesRequest = await axiosInstance.get("/medicamentos", {
    params: {
      categoria: categoryId,
    },
  });

  return medicines;
}

async function getMedicine(
  axiosInstance: AxiosInstance,
  processNumber: string
) {
  const { data: medicine }: MedicineResponse = await axiosInstance.get(
    `/medicamento/${processNumber}`
  );

  return medicine;
}

function getLastPresentation(presentations: Presentation[]) {
  if (presentations.length === 0) {
    return null;
  }

  const sortedPresentations = presentations.sort((a, b) => b.codigo - a.codigo);
  return sortedPresentations[0];
}

async function main() {
  const axiosBularioInstance = axios.create({ baseURL: BULARIO_API_URL });
  const axiosPhaisPlusMedicineInstance = axios.create({
    baseURL: PHAIS_PLUS_MEDICINE_API_URL,
  });

  console.log("CREATING CATEGORIES...")
  const categories = await getCategories(axiosBularioInstance);
  const categoryDescriptions = new Set(
    categories.map((category) => category.descricao.toUpperCase())
  );

  await prisma.medicineType.deleteMany();

  await prisma.medicineType.createMany({
    data: [...categoryDescriptions].map((categoryDescription) => {
      return { name: categoryDescription };
    }),
  });

  console.log(`[SUCCESS] ${categories.length} CATEGORIES CREATED`)

  console.log("GETTING MEDICINES BY CATEGORY...")
  let medicines: DatabaseMedicine[] = [];
  let activePrinciples: Set<string> = new Set();
  let prescriptions: Set<string> = new Set();
  let pharmacologicalGroups: Set<string> = new Set();
  for (const category of categories) {
    console.log(`GETTING MEDICINES FROM CATEGORY ${category.descricao.toUpperCase()}...`)
    const medicineProcessNumbers = await getMedicinesByCategory(
      axiosBularioInstance,
      category.id
    );

    if (!medicineProcessNumbers) {
      continue;
    }

    const processNumbers = medicineProcessNumbers.map(
      (medicineProcessNumber) => medicineProcessNumber.numProcesso
    );

    for (const processNumber of processNumbers) {
      try {
        const medicine = await getMedicine(axiosBularioInstance, processNumber);

        if (!medicine.principioAtivo) {
          continue;
        }

        activePrinciples.add(medicine.principioAtivo.toUpperCase());

        const lastPresentation = getLastPresentation(medicine.apresentacoes);
        if (lastPresentation) {
          for (const prescription of lastPresentation.restricaoPrescricao) {
            prescriptions.add(prescription.toLocaleUpperCase());
          }
        }

        for (const pharmacologicalGroup of medicine.classesTerapeuticas) {
          pharmacologicalGroups.add(pharmacologicalGroup.toUpperCase());
        }

        medicines.push({
          name: medicine.nomeComercial.toLocaleUpperCase(),
          medicineType: medicine.categoriaRegulatoria.toUpperCase(),
          activePrinciple: medicine.principioAtivo.toUpperCase(),
          prescription:
            lastPresentation?.restricaoPrescricao &&
            lastPresentation?.restricaoPrescricao.length > 0
              ? lastPresentation?.restricaoPrescricao[0]
              : "",
          pharmacologicalGroups: medicine.classesTerapeuticas.map(
            (terapeuthicClass) => terapeuthicClass.toUpperCase()
          ),
        });
      } catch (exception) {
        if (
          exception instanceof AxiosError &&
          exception.response?.status === 404
        ) {
          continue;
        }

        throw exception;
      }
    }

    console.log(`[SUCCESS] ${processNumbers.length} MEDICINES RETRIEVED`)
  }

  const activePrincipleArray = [...activePrinciples];
  const prescriptionArray = [...prescriptions];
  const pharmacologicalGroupArray = [...pharmacologicalGroups];

  await prisma.activePrinciple.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.pharmacologicalGroup.deleteMany();

  console.log("CREATING ACTIVE PRINCIPLES...")
  await prisma.activePrinciple.createMany({
    data: activePrincipleArray.map((activePrinciple) => {
      return { name: activePrinciple };
    }),
  });
  console.log(`[SUCCESS] ${activePrincipleArray.length} ACTIVE PRINCIPLES CREATED`)

  console.log("CREATING PRESCRIPTIONS...")
  await prisma.prescription.createMany({
    data: prescriptionArray.map((prescription) => {
      return { name: prescription };
    }),
  });
  console.log(`[SUCCESS] ${prescriptionArray.length} PRESCRIPTIONS CREATED`)

  console.log("CREATING PHARMACOLOGICAL GROUPS...")
  await prisma.pharmacologicalGroup.createMany({
    data: pharmacologicalGroupArray.map((pharmacologicalGroup) => {
      return { name: pharmacologicalGroup };
    }),
  });
  console.log(`[SUCCESS] ${pharmacologicalGroupArray.length} PHARMACOLOGICAL GROUPS CREATED`)

  const dbMedicineTypes = await prisma.medicineType.findMany();
  const dbActivePrinciples = await prisma.activePrinciple.findMany();
  const dbPrescriptions = await prisma.prescription.findMany();
  const dbPharmacologicalGroups = await prisma.pharmacologicalGroup.findMany();

  console.log("CREATING MEDICINES...")
  for (const medicine of medicines) {
    await axiosPhaisPlusMedicineInstance.post("/", {
      name: medicine.name,
      medicine_type_id: dbMedicineTypes.find(
        (medicineType) => medicineType.name === medicine.medicineType
      )?.id,
      active_principle_id: dbActivePrinciples.find(
        (activePrinciple) => activePrinciple.name === medicine.activePrinciple
      )?.id,
      prescription_id: dbPrescriptions.find(
        (prescription) => prescription.name === medicine.name
      )?.id,
      pharmacological_group_ids: medicine.pharmacologicalGroups.map(
        (pharmacologicalGroup) => {
          return dbPharmacologicalGroups.find(
            (dbPharmacologicalGroup) =>
              dbPharmacologicalGroup.name === pharmacologicalGroup
          )?.id;
        }
      ),
    });
  }

  console.log(`[SUCCESS] ${medicines.length} MEDICINES CREATED`)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (exception) => {
    await prisma.$disconnect();
    throw exception;
    // process.exit(1);
  });
