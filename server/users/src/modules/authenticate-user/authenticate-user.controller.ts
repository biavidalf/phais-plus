import { Request, Response } from "express";
import { formatResponse } from "../../utilities/formatting";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const useCase = new AuthenticateUserUseCase();

    try {
      const { status, json } = await useCase.execute(
        request.params,
        request.body
      );
      return response.status(status).json(json);
    } catch (error) {
      const { status, json } = formatResponse(500, "Internal server error.");
      return response.status(status).json(json);
    }
  }
}
