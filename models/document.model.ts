import { required, string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface PDFDocument extends Document {
  title: string;
  s3Url: string;
  s3Key: string; 
  name: string;
  documentNumber: string;
  address: string;
  dob: string;
  gender: string;
  parentName: string;
  issuedOn?: string;
  uploadedBy: mongoose.Types.ObjectId;
}

const pdfSchema: Schema = new Schema(
  {
    name: { type: String,required:true},
    parentName: { type: String, required: true },
    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Non-Binary",
        "Prefer not to say",
        "Transgender",
      ],
      required: true,
    },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    s3Key: { type: String, required: true },
    documentNumber: { type: String, required: true },
    issuedOn: { type: String },
    title: { type: String, required: true },
    s3Url: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model<PDFDocument>("PDF", pdfSchema);
