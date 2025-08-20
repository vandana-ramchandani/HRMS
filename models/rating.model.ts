import { Schema,model } from "mongoose";

const ratingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        enum: ["G2", "Capterra"],
        required: true,
    },
}, { timestamps: true });
const RatingModel = model("ratings", ratingSchema);
export default RatingModel;