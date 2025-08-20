import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  billingType: {
    type: String,
    enum: ["T&M", "Fixed", "Recurring", "Milestone billing"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  projectManager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "On Hold", "Cancelled"],
    default: "Active",
  },
},{
    timestamps: true,
});
const ProjectModel = model("Project", projectSchema);
export default ProjectModel;
