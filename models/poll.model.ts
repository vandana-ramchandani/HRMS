import { string } from "joi";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: [optionSchema],
      required: true,
      validate: {
        validator: function (value: any) {
          return value.length >= 2;
        },
        message: "At least two options are required.",
      },
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    // departments: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Department",
    // },
    departmennts:{
      type:String
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    votedUsers: {
      type: Map,
      of: Number,
      default: {},
    },
    createdBy: {
      type: String, 
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Poll", pollSchema);
