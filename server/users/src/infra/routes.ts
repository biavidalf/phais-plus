import { Router } from "express";
import { AuthenticateUserController } from "../modules/authenticate-user/authenticate-user.controller";
import { CreateUserController } from "../modules/create-user/create-user.controller";
import { DeleteUserController } from "../modules/delete-user/delete-user.controller";
import { GetUserController } from "../modules/get-user/get-user.controller";
import { GetUsersController } from "../modules/get-users/get-users.controller";
import { UpdateUserController } from "../modules/update-user/update-user.controller";

const router = Router();

router.get("/", new GetUsersController().handle);
router.get("/:id", new GetUserController().handle);
router.post("/", new CreateUserController().handle);
router.patch("/:id", new UpdateUserController().handle);
router.delete("/:id", new DeleteUserController().handle);
router.post("/authenticate", new AuthenticateUserController().handle);

export { router };

