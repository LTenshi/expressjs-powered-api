import { NextFunction, Request, Response } from "express";
import exportJob from "../models/exportJob";
import importJob from "../models/importJob";

function bookProcessingMW(req: Request, res: Response, next: NextFunction) {
    try { 
        verifyPayload(req);
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid data object");
    }
    req.body.state = "pending";
    req.body.created_at = new Date();
    next();
}

function verifyPayload(req: Request) {
    switch(req.path) {
        case "/export":
            if (!req.body.bookId || !req.body.type) {
                throw new Error("invalid data object");
            }
            break;
        case "/import":
            if (!req.body.bookId || !req.body.type || !req.body.url) {
                throw new Error("invalid data object");
            }
            break;
        default:
            throw new Error("invalid data object");
    }
}

export { bookProcessingMW };