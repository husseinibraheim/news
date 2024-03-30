import { Request,Response, NextFunction } from "express";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null,path.join(__dirname,"../../../dist/upload/"));
    },
    filename(req, file, callback) {
        const randomName = Date.now()+"-"+file.originalname   
        callback(null,randomName);
    },
});

export const upload = multer({storage});