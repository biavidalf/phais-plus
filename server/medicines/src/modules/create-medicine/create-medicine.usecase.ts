import { ParamsDictionary } from "express-serve-static-core";
import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/kafka/kafka.producer";
import { formatResponse } from "../../utilities/formatting";

type CreateMedicineRequestBody = {
  name: string
  active_principle: string
  therapeutic_class: string
  regulatory_category: string
  process_number: string
  process_end_date: Date
  registration_number: string
  registration_expiration_date: Date
  registration_holder_company: string
  registration_status: string
};

export class CreateMedicineUseCase {
  constructor() { }

  async execute(params: ParamsDictionary, body: CreateMedicineRequestBody) {
    const {
      name,
      active_principle,
      therapeutic_class,
      regulatory_category,
      process_number,
      process_end_date,
      registration_number,
      registration_expiration_date,
      registration_holder_company,
      registration_status,
    } = body;

    const foundMedicineByProcessNumber = await prismaClient.medicine.findFirst({
      where: { deleted_at: null, process_number, },
    });
    if (foundMedicineByProcessNumber) {
      return formatResponse(
        409,
        "There is already a medicine with this process number.",
        foundMedicineByProcessNumber
      );
    }

    const foundMedicineByRegistrationNumber = await prismaClient.medicine.findFirst({
      where: { deleted_at: null, registration_number, },
    });
    if (foundMedicineByRegistrationNumber) {
      return formatResponse(
        409,
        "There is already a medicine with this registration number.",
        foundMedicineByRegistrationNumber
      );
    }

    const createdMedicine = await prismaClient.medicine.create({
      select: {
        id: true,
        name: true,
        active_principle: true,
        therapeutic_class: true,
        regulatory_category: true,
        process_number: true,
        process_end_date: true,
        registration_number: true,
        registration_expiration_date: true,
        registration_holder_company: true,
        registration_status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
      data: {
        name,
        active_principle,
        therapeutic_class,
        regulatory_category,
        process_number,
        process_end_date,
        registration_number,
        registration_expiration_date,
        registration_holder_company,
        registration_status,
      },
    });

    const kafkaSendMessage = new KafkaSendMessage();
    kafkaSendMessage.execute("medicine-created", {
      id: createdMedicine.id,
      name: createdMedicine.name,
    });

    return formatResponse(
      201,
      "Medicine created successfully.",
      createdMedicine
    );
  }
}
