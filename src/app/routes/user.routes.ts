import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { auth } from "../middlewares/authorization/jwt.utils";
import { validate } from "../middlewares/validation/validation";
import { validationSchemas } from "../utils/joiSchemas";
const router = Router();

// Create user
router.post("/", validate(validationSchemas.registerSchema), userController.create);
router.post("/login", userController.login);
router.get("/", userController.getAll);
router.patch("/logout", auth, userController.logout);
router.patch("/:id", auth, userController.updateUser);

export default router;
