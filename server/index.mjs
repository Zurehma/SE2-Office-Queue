// APIs definition in here

import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import Utility from "./utilities.mjs";
import AuthRoutes from "./routes/authRoutes.mjs";
import ServiceRoutes from "./routes/serviceRoutes.mjs";
import CounterRoutes from "./routes/counterRoutes.mjs";

const app = new express();
const port = 3001;
const baseURL = "/api";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json({ limit: "25mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const authRoutes = new AuthRoutes(app);
const serviceRoutes = new ServiceRoutes();
const counterRoutes = new CounterRoutes();

authRoutes.initRoutes();
serviceRoutes.initRoutes();
counterRoutes.initRoutes();

app.use(baseURL + "/sessions", authRoutes.getRouter());
app.use(baseURL + "/service", serviceRoutes.getRouter());
app.use(baseURL + "/counter", counterRoutes.getRouter());
app.use(Utility.errorHandler);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

export { app };