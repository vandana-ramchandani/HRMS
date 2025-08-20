import { Schema,model } from "mongoose";

const relationSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    relation:{
        type:String,
        enum:["Child","Father","Father-in-law","Mother","Mother-in-law","Others","Partner","Self","Sibling","Spouse"]
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    profession:{
        type:String
    },
    dateOfBirth:{
        type:Date
    }
})
const RealtionModel=model("Relation",relationSchema);
export default RealtionModel;