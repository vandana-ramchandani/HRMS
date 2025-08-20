import { required } from "joi";
import { Schema, model } from "mongoose";

const jobdetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    jobTitlePrimary: {
      type: String,
      required: true,
    },
    jobTitleSecondary: {
      type: String,
      required: true,
    },
    probationStatus: {
      type: Boolean,
      required: true,
    },
    probationDate: {
      type: String,
    },
    probationDuration: {
      type: String,
    },
    noticePeriod: {
      type: String,
      required: true,
    },
    workerType: {
      type: String,
      enum: ["Permanent", "Intern"],
      required: true,
    },
    timeType: {
      type: String,
      enum: ["Full Time", "Part Time"],
      required: true,
    },
    contractStatus: {
      type: String,
      default: "Not Applicable",
    },
    payBand: {
      type: String,
      default: "Not Set",
    },
    payGrade: {
      type: String,
      default: "Not Set",
    },
    shift: {
      type: String,
      enum: ["General Shift", "Night Shift"],
      required: true,
    },
    weeklyOffPolicy: {
      type: String,
    },
    leavePlan: {
      type: String,
      required: true,
    },
    holidayCalendar: {
      type: String,
      required: true,
    },
    attendanceCaptureScheme: {
      type: String,
      default: "Head Office",
    },
    attendancePenalisationPolicy: {
      type: String,
      default: "Penalization Policy",
    },
    shiftWeeklyOffRule: {
      type: String,
      default: "Not Set",
    },
    shiftAllowancePolicy: {
      type: String,
      default: "Not Set",
    },
    Overtime: {
      type: String,
      default: "Not Set",
    },
  },
  { timestamps: true }
);
const JobdetailsModel = model("jobdetail", jobdetailsSchema);
export default JobdetailsModel;
