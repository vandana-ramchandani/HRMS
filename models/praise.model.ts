import { Schema, model } from "mongoose";

const praiseSchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentions: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  badgeId: {
    type: Schema.Types.ObjectId,
    ref:"badge",
    required: true,
  },
  attachments: {
    type: [String], 
  },
  // department:{
  //   type:Schema.Types.ObjectId,
  //   ref:"Department",
  //   default:null
  // }
}, {
  timestamps: true
});

const PraiseModel = model("Praise", praiseSchema);
export default PraiseModel;
