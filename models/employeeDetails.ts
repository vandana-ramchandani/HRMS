import mongoose from "mongoose";
const empDetSch = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      default: null,
    },
    middleName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    displayName: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married"],
      default: null,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+"],
      default: null,
    },
    physicallyHandicapped: {
      type: String,
      enum: ["yes", "no"],
      default: null,
    },
    nationality: {
      type: String,
      enum: [
        "India",
        "America",
        "china",
        "Iran",
        "israel",
        "Italy",
        "Iraq",
        "jersey",
        "japan",
        "korea",
        "kuwait",
        "liberia",
        "maldives",
        "mexico",
        "malaysia",
        "norway",
        "nepal",
      ],
      default: null,
    },
    personalEmail: {
      type: String,
      default: null,
    },
    workEmail: {
      type: String,
      unique: true,
      default: null,
    },
    mobileNo: {
      type: String,
      default: null,
    },
    workNo: {
      type: String,
      default: null,
    },
    residenceNo: {
      type: String,
      default: null,
    },
    skypeId: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    hobbies: {
      type: String,
      default: null,
    },
    professionalSummary: {
      type: String,
      default: null,
    },

    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const employee = mongoose.model("Emp", empDetSch);
export default employee;
