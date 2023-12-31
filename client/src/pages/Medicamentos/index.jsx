import BaseLayout from "./../../components/BaseLayout";
import Search from "./../../components/Input/Search";
import Table from "./../../components/Table";
import Filter from "../../components/Filter";

function Medicamentos() {
  let tableTitles = [
    "Código",
    "Medicamento",
    "Princípio Ativo",
    "Receituário",
    "Tipo",
    "Laboratório",
  ];
  let tableValues = [
    [
      "/detalhes",
      "#123",
      "Topison",
      "Furoato de mometasona",
      "Receita Comum",
      "R",
      "LIBBS",
    ],
    [
      "/detalhes",
      "#123",
      "Topison",
      "Furoato de mometasona",
      "Receita Comum",
      "R",
      "LIBBS",
    ],
    [
      "/detalhes",
      "#123",
      "Topison",
      "Furoato de mometasona",
      "Receita Comum",
      "R",
      "LIBBS",
    ],
    [
      "/detalhes",
      "#123",
      "Topison",
      "Furoato de mometasona",
      "Receita Comum",
      "R",
      "LIBBS",
    ],
    [
      "/detalhes",
      "#123",
      "Topison",
      "Furoato de mometasona",
      "Receita Comum",
      "R",
      "LIBBS",
    ],
  ];

  return (
    <BaseLayout pageName="Todos os medicamentos">
      <div className="relative flex justify-center items-center w-10/12 md:w-fit gap-2">
        <Search />

        <Filter />
      </div>

      <Table titles={tableTitles} values={tableValues} hasLinks />
    </BaseLayout>
  );
}

export default Medicamentos;
