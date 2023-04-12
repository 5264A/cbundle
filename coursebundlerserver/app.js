import express, { urlencoded } from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
config({
  path: "./config/config.env",
});
const app = express();

// middlewares for featching data
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// importing routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);

export default app;

app.use(ErrorMiddleware);
