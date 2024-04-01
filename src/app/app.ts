import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";
import newsRouter from "./routes/news.routes";
import errorMW from "./middlewares/error/error.middleware";
import { notFoundMiddleware } from "./middlewares/error/notFound.middleware";

const app = express();
app.use(express.static(path.join(__dirname, "../../dist/upload")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/news", newsRouter);

// Not Found End point
app.use(notFoundMiddleware);
// Error middle ware
app.use(errorMW);

export default app;
