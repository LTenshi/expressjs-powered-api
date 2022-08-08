import express from "express"
import { getImpExpRoutes } from "./ImpExp";


function getRoutes() {
    const router = express.Router();

    //More route sets can be imported below.
    router.use("/ImpExp", getImpExpRoutes());

    return router;
}

export default getRoutes;