import bcrypt from "bcrypt";
import { ParamsDictionary } from "express-serve-static-core";
import { prismaClient } from "../../infra/database/prismaClient";
import { formatResponse } from "../../utilities/formatting";
import { validateDocument } from "../../utilities/validation";

type AuthenticateUserRequestBody = {
  cnpj: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor() {}

  async execute(params: ParamsDictionary, body: AuthenticateUserRequestBody) {
    const { cnpj, password } = body;

    if (!cnpj || !password) {
      return formatResponse(400, "Please provide all required fields.");
    }

    if (!validateDocument(cnpj)) {
      return formatResponse(400, "Please provide a valid CNPJ.");
    }

    const foundUser = await prismaClient.user.findUnique({
      where: { cnpj, deleted_at: null },
    });

    if (!foundUser) {
      return formatResponse(404, "User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return formatResponse(401, "Invalid password.");
    }

    return formatResponse(200, "User authenticated successfully.", {
      id: foundUser.id,
      cnpj: foundUser.cnpj,
      email: foundUser.email,
      username: foundUser.username,
      phone: foundUser.phone,
      created_at: foundUser.created_at,
      updated_at: foundUser.updated_at,
    });
  }
}
