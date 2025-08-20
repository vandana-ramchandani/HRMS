import { Schema, model } from "mongoose";

const leaveSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["paid", "unpaid"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  days: {
    type: String, 
    required: true,
  },
  actionTakenOn: {
    type: Date,
    default: null,
  },
  actionTakenBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectReason:{
    type:String,
    default:null
  },
  notify: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", 
    }
  ],
}, {
  timestamps: true 
});

const LeaveModel = model("Leave", leaveSchema);

export default LeaveModel;