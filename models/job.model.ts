import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    applyLink: { 
      type: String, 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
