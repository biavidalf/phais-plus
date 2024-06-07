import { ParamsDictionary } from "express-serve-static-core";
import { prismaClient } from "../../infra/database/prismaClient";
import { formatResponse } from "../../utilities/formatting";

type GetMedicineRequestBody = {};

export class GetMedicineUseCase {
  constructor() { }

  async execute(params: ParamsDictionary, body: GetMedicineRequestBody) {
    const { id } = params;

    const foundMedicine = await prismaClient.medicine.findUnique({
      where: { id, deleted_at: null },
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
    });

    if (!foundMedicine) {
      return formatResponse(
        404,
        "A medicine with the provided ID does not exist."
      );
    }

    return formatResponse(200, "Medicine found successfully.", foundMedicine);
  }
}
