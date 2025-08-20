import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(ERROR_MESSAGES.MONGO_URI_NOT_DEFINED);
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(
      SUCCESS_MESSAGES.MONGO_CONNECTION_SUCCESS(conn.connection.host)
    );
  } catch (error) {
    console.error(ERROR_MESSAGES.MONGO_CONNECTION_FAILED, error);
    process.exit(1);
  }
};

export default connectDB;
