import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { RequestController } from "../controllers/RequestController";

const router = Router();

const requestController = new RequestController();

router.get("/", authMiddleware, requestController.index); 
router.get("/search", authMiddleware, requestController.search);
router.post("/", authMiddleware, requestController.create);

router.get("/:id", authMiddleware, requestController.view);
router.put("/:id", authMiddleware, requestController.fullUpdate);
router.patch("/:id", authMiddleware, requestController.partialUpdate);
router.delete("/:id", authMiddleware, requestController.delete);

export { router };

