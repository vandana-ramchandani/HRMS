import { request } from "http";
import { Schema,model } from "mongoose";

const assetsSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    orgId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    requestItem:{
        type:String,
        required:true
    },
    requestStatus:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    IsRecieved:{
        type:Boolean,
        default:false
    },
    returnStatus:{
        type:String,
        enum:["not taken","returned","not returned"],
        default:"not taken"
    }
},{
    timestamps:true
})
const AssetsModel = model("assets",assetsSchema);
export default AssetsModel;