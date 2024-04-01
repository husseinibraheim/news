import { Router } from "express";
import * as subscribeController from "../controllers/subscription.controller"
import { auth } from "../middlewares/authorization/jwt.utils";
import { validationSchemas } from "../utils/joiSchemas";
import { validate } from "../middlewares/validation/validation";
const router = Router();

// unsbscribe

//subscribe
router.post("/", auth, validate(validationSchemas.subscribeSchema), subscribeController.createSubscribe)
router.get("/", auth, subscribeController.getAllSubscription)
router.patch("/:id", auth, subscribeController.unsubscribe)



export default router;
