import { count } from "console";
import { Schema,model } from "mongoose";

const teamMembersSchema = new Schema({
    name: String,
    designation: String,
    image: String,
    delete_flag : {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
}
);
const TeamMembers = model("TeamMembers", teamMembersSchema);
export default TeamMembers;
