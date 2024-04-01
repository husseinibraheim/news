import { Router } from "express";
import * as newsController from "../controllers/news.controller"
import { auth } from "../middlewares/authorization/jwt.utils";
const router = Router();

// unsbscribe

//subscribe
router.get("/", auth, newsController.getAllNews)
router.get("/subscribed", auth, newsController.getSubscribedNews)



export default router;
