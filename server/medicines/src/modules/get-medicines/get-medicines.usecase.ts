import { ParamsDictionary } from "express-serve-static-core";
import { prismaClient } from "../../infra/database/prismaClient";
import { formatResponse } from "../../utilities/formatting";

type GetMedicinesRequestBody = {};

export class GetMedicinesUseCase {
  constructor() { }

  async execute(params: ParamsDictionary, body: GetMedicinesRequestBody) {
    const foundMedicines = await prismaClient.medicine.findMany({
      where: { deleted_at: null },
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

    return formatResponse(200, "Medicines found succesfully.", foundMedicines);
  }
}
