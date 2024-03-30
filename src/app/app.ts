import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import errorMW from "./middlewares/error/error.middleware";
import { notFoundMiddleware } from "./middlewares/error/notFound.middleware";
import { auth } from "./middlewares/authorization/jwt.utils";

const app = express();
app.use(express.static(path.join(__dirname, "../../dist/upload")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// User Router
// app.use("/api/v1/users", auth, getUserPerm, userRouter); // admin user x y
// User Router
app.use("/api/v1/users", userRouter); // admin user x y
// Posts Router
app.use("/api/v1/posts", postRouter);
// Not Found End point
app.use(notFoundMiddleware);
// Error middle ware
app.use(errorMW);

export default app;
