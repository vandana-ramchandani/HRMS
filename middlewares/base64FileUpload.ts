import { Request, Response, NextFunction } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const base64FileUpload = (fieldName: string) => [
  upload.fields([{ name: fieldName, maxCount: 5 }]), 
  (req: Request, res: Response, next: NextFunction) => {
    const file = (req.files as Record<string, Express.Multer.File[]>)?.[fieldName]?.[0];
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    req.body.attachments = [`data:${file.mimetype};base64,${file.buffer.toString("base64")}`];
    next();
  },
];

export default base64FileUpload;
