import express, { Request, Response } from "express";
import getRoutes from "./routes";

const app = express();
const defaultPort: number = 8080;


app.use(express.json());
app.use("/api", getRoutes());

app.listen(process.env.PORT || defaultPort, () => {
    console.log(`Application online on http://localhost:${process.env.PORT || defaultPort}`);
})

module.exports = app;