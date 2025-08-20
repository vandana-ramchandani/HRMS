import { required } from "joi";
import mongoose, { Schema } from "mongoose";

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model("Contact", ContactSchema);
