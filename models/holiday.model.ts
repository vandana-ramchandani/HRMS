
import { Schema, model } from 'mongoose';

const HolidaySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    holidayImage:{
        type:String
    }

}
,{timestamps:true});

export const Holiday = model('Holiday', HolidaySchema);
