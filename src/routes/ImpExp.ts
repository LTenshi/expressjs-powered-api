import express, {NextFunction, Request, Response} from "express"
import { bookProcessingMW } from "../middleware/bookProcessingMW";
import exportJob from "../models/exportJob";
import importJob from "../models/importJob";
import { loadFromStorage, processExport, processImport } from "../service/processImportExport";


function getImpExpRoutes() {
    const router = express.Router();

    //POSTS
    router.post("/export", bookProcessingMW, exportBook);
    router.post("/import", bookProcessingMW, importBook);
    
    //GETS
    router.get("/exportRequests", exportRequests);
    router.get("/importRequests", importRequests);

    return router;
}

//POST a request for a new Export job. Valid requests should be saved in memory. Invalid requests should return an error.
// {
//     bookId: string,
//     type: "epub" | "pdf"
// }
async function exportBook(req: Request, res: Response, next: NextFunction) {
    try {
        const exportJobReq = req.body as exportJob;
        await processExport(exportJobReq);
        res.status(200).send(`Book ${exportJobReq.bookId} exported`);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

//POST a request for a new Import job. Valid requests should be saved in memory. Invalid requests should return an error.
// {
//     bookId: string,
//     type: "word" | "pdf" | "wattpad" | "evernote",
//     url: string
// }
async function importBook(req: Request, res: Response, next: NextFunction) {
    try {
        const importJobReq = req.body as importJob;
        await processImport(importJobReq);
        res.status(200).send(`Book ${importJobReq.bookId} imported`);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

//GET a list of Export requests, grouped by their current state (see below).
async function exportRequests(req: Request, res: Response) {
    try {
        if(!req.query.state) {
            res.status(400).send("Please provide a query");
        }

        let exportItems: any  = await loadFromStorage("export");
        if(!exportItems) {
            res.status(200).send("");
            return;
        }

        switch(req.query.state) {
            case "pending":
                // @ts-ignore
                let pendingItems = exportItems.filter(item => { return item.state = "pending" } );
                res.status(200).send(JSON.stringify(pendingItems));
                break;
            case "finished":
                // @ts-ignore
                let finishedItems = exportItems.filter(item => { return item.state = "finished" } );
                res.status(200).send(JSON.stringify(finishedItems));
                break;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

//GET a list of Import requests, grouped by their current state (see below).
async function importRequests(req: Request, res: Response) {
    try {
        if(!req.query.state) {
            res.status(400).send("Please provide a query");
        }

        let importItems: any  = await loadFromStorage("import");
        if(importItems === undefined) {
            res.status(200).send("");
        }
        switch(req.query.status) {
            case "pending":
                // @ts-ignore
                let pendingItems = importItems.filter(item => { return item.state = "pending" } );
                res.status(200).send(JSON.stringify(pendingItems));
                break;
            case "finished":
                // @ts-ignore
                let finishedItems = importItems.filter(item => { return item.state = "finished" } );
                res.status(200).send(JSON.stringify(finishedItems));
                break;
            default:
                res.status(500);
                break;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }

}

export { getImpExpRoutes };