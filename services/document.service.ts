import {
  uploadToS3,
  deleteFromS3,
  generatePresignedUrl,
} from "../utils/helpers/awsS3";
import PDFModel, { PDFDocument } from "../models/document.model";
import { AppError } from "../utils/helpers/ global.error.handler";

export const uploadPDFService = async (
  file: Express.Multer.File,
  title: string,
  userId: string,
  name: string,
  documentNumber: string,
  address: string,
  dob: string,
  gender: string,
  parentName: string,
  issuedOn?: string
) => {
  if (!file) {
    throw new AppError("PDF file is required", 400);
  }

  const { s3Url, key } = await uploadToS3(
    file.buffer,
    file.originalname,
    "pdfs",
    file.mimetype
  );

  const pdf = new PDFModel({
    title,
    s3Url,
    s3Key: key,
    name,
    documentNumber,
    address,
    dob,
    gender,
    parentName,
    issuedOn,
    uploadedBy: userId,
  });

  await pdf.save();
  return pdf;
};


export const getAllPDFsService = async (userId: string) => {
  const pdfs = await PDFModel.find({ uploadedBy: userId }).lean();
  
  const updatedPdfs = await Promise.all(
    pdfs.map(async (pdf) => {
      const presignedUrl = await generatePresignedUrl(pdf.s3Key);
      return {
        ...pdf,
        s3Url: presignedUrl,
      };
    })
  );

  return updatedPdfs;
};


export const editPDFService = async (
  id: string,
  title: string,
  file: Express.Multer.File | undefined, 
  userId: string,
  name: string,
  documentNumber: string,
  address: string,
  dob: string,
  gender: string,
  parentName: string,
  issuedOn: string
) => {
  const existingPDF = await PDFModel.findById(id);
  if (!existingPDF) {
    throw new AppError("PDF not found", 404);
  }

  let s3Key = existingPDF.s3Key;
  let s3Url = existingPDF.s3Url;

  if (file) {
    if (existingPDF.s3Key) {
      await deleteFromS3(existingPDF.s3Key);
    }

    const uploadResult = await uploadToS3(
      file.buffer,
      file.originalname,
      "pdfs",
      file.mimetype
    );

    s3Key = uploadResult.key;
    s3Url = uploadResult.s3Url;
  }


  const updatedPDF = await PDFModel.findByIdAndUpdate(
    id,
    {
      title,
      s3Key,
      s3Url,
      uploadedBy: userId,
      name,
      documentNumber,
      address,
      dob,
      gender,
      parentName,
      issuedOn,
    },
    { new: true }
  );

  return updatedPDF;
};


export const getPDFByIdService = async (id: string, userId: string) => {
  const pdf = await PDFModel.findOne({ _id: id, uploadedBy: userId }).lean();

  if (!pdf) {
    throw new AppError("Document not found", 404);
  }

  const presignedUrl = await generatePresignedUrl(pdf.s3Key);

  return {
    ...pdf,
    s3Url: presignedUrl,
  };
};


export const deletePDFService = async (id: string) => {
  const pdf = await PDFModel.findById(id);
  if (!pdf) {
    throw new AppError("PDF not found", 404);
  }
  await deleteFromS3(pdf.s3Url);
  await pdf.deleteOne();
  return pdf;
};
