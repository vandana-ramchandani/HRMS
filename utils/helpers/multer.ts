import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    fileValidationError?: string;
  }
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueSuffix);
  },
});

const memoryStorage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedTypes = /jpeg|jpg|png|pdf|webp|svg/;
  const isExtValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isMimeValid = allowedTypes.test(file.mimetype);

  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"));
  }
};

export const uploadToDisk = multer({
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

export const uploadToMemory = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileValidationError = "Only PDF files are allowed!";
    }
  },
});
