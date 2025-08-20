import { timeStamp } from "console";

const { Schema, model } = require("mongoose");

const landingcard = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    amount: {
      type: Number,
    }
  },
  { timestamps: true }
);
const LandingCardModel = model("landingcard", landingcard);
export default LandingCardModel;
