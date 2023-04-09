import express, { urlencoded } from "express";
import {config} from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js"
config({
    path:"./config/config.env"
})
const app = express();

// middlewares for featching data
app.use(express.json());
app.use(urlencoded({
    extended:true,
}))

// importing routes
import course from './routes/courseRoutes.js'
import user from './routes/userRoutes.js'
app.use("/api/v1",course);
app.use("/api/v1",user);

export default app;

app.use(ErrorMiddleware)