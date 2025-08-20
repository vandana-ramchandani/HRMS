import mongoose, { Document, Schema } from 'mongoose';

interface Session {
    checkInTime: Date;
    checkOutTime?: Date;
}

export interface IAttendance extends Document {
    userId: mongoose.Types.ObjectId;
    date: string; 
    sessions: Session[];
    // ipAddresses: string[];
    // locations: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const sessionSchema = new Schema<Session>(
    {
        checkInTime: { type: Date, required: true },
        checkOutTime: { type: Date },
    },
    { _id: false }
);

const attendanceSchema = new Schema<IAttendance>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: String, required: true },
        sessions: { type: [sessionSchema], default: [] },
        //ipAddresses: { type: [String], default: [] },
        //locations: { type: [String], default: [] },
    },
    { timestamps: true }
);

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IAttendance>('Attendance', attendanceSchema);
