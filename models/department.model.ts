import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
export default mongoose.model("Department", DepartmentSchema);
