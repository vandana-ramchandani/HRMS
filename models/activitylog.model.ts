import { Schema, model } from 'mongoose';

const activitylogSchema = new Schema({
    timestamp: Date,
    level: String,
    message: String,
    metadata: Schema.Types.Mixed
  });

const ActivityLog = model('activity_log', activitylogSchema);
export default ActivityLog;