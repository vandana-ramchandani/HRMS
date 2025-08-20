// import ActivityLog from "../../models/activitylog.model";

// export const logActivity = async ({
//   level = 'info',
//   message,
//   metadata = {}
// }: {
//   level?: 'info' | 'error';
//   message: string;
//   metadata?: Record<string, any>;
// }) => {
//   try {
//     await new ActivityLog({
//       timestamp: new Date(),
//       level,
//       message,
//       metadata
//     }).save();
//   } catch (err) {
//     console.error('❌ Failed to log activity:', err);
//   }
// };

// utils/logger.ts
import winston from 'winston';
import 'winston-mongodb';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.MongoDB({
      level: 'error', 
      db: process.env.MONGO_URI || 'mongodb://localhost:27017/logs',
      options: { useUnifiedTopology: true },
      collection: 'error_logs', 
      tryReconnect: true,
    }),
  ],
});

export default logger;


