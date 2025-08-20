import mongoose, { Schema, Document } from "mongoose";

export interface AboutKeka extends Document {
  title: string;
  description: string;
  image: string;
}

const AboutKekaSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subtile: { type: String  },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<AboutKeka>("AboutKeka", AboutKekaSchema);