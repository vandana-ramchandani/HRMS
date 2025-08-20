import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    googleId: String,

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["superAdmin", "organisation", "employee"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    logo: { type: String },
    description: {
      type: String,
    },
    empId: {
      type: Number,
    },
    departmentName: {
      type: String,
      ref: "Department",
    },
    departmentId:{
      type:String,
      ref:"Department",
    },
    reportingManager: {
      type: String,
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    phnNo: {
      type: String,
    },
    noOfEmployees: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "200+"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
