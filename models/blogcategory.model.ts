import { Schema, model } from "mongoose";

const blogCategory = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image : {
        type: String,
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,

})
const blogCategoryModel = model("blogCategory", blogCategory);

export default blogCategoryModel;