import Attendance, { IAttendance } from "../models/attendance.model";
import moment from "moment";

export const handleCheckIn = async (userId: string) => {
  const today = moment().format("YYYY-MM-DD");
  let attendance = await Attendance.findOne({ userId, date: today });

  if (!attendance) {
    attendance = new Attendance({
      userId,
      date: today,
      sessions: [{ checkInTime: new Date() }],
    });
  } else {
    const lastSession = attendance.sessions[attendance.sessions.length - 1];
    if (lastSession && !lastSession.checkOutTime) {
      throw new Error("Already checked in without checkout");
    }
    attendance.sessions.push({ checkInTime: new Date() });
  }

  await attendance.save();
  return attendance;
};

export const handleCheckOut = async (userId: string) => {
  const today = moment().format("YYYY-MM-DD");
  const attendance = await Attendance.findOne({ userId, date: today });

  if (!attendance || attendance.sessions.length === 0) {
    throw new Error("No check-in found for today");
  }

  const lastSession = attendance.sessions[attendance.sessions.length - 1];
  if (lastSession.checkOutTime) {
    throw new Error("Already checked out");
  }

  lastSession.checkOutTime = new Date();
  await attendance.save();
  return attendance;
};

export const calculateTotalDuration = async (userId: string, date: string) => {
  const attendance = await Attendance.findOne({ userId, date });

  if (!attendance) {
    throw new Error("No attendance record found for the specified date");
  }

  let totalMilliseconds = 0;

  for (const session of attendance.sessions) {
    if (session.checkInTime && session.checkOutTime) {
      const duration =
        new Date(session.checkOutTime).getTime() -
        new Date(session.checkInTime).getTime();
      totalMilliseconds += duration;
    }
  }

  const durationMoment = moment.duration(totalMilliseconds);
  const hours = Math.floor(durationMoment.asHours());
  const minutes = Math.floor(durationMoment.minutes());

  return `${hours}h ${minutes}m`;
};

export const getAttendanceHistory = async (userId: string) => {
  const logs = await Attendance.find({ userId }).sort({ date: 1 });

  const history: Record<string, { sessions: any[]; totalDuration: number }> =
    {};

  logs.forEach((entry) => {
    const date = entry.date;

    if (!history[date]) {
      history[date] = {
        sessions: [],
        totalDuration: 0,
      };
    }

    entry.sessions.forEach((session) => {
      const { checkInTime, checkOutTime } = session;

      let duration = 0;
      if (checkInTime && checkOutTime) {
        duration =
          new Date(checkOutTime).getTime() - new Date(checkInTime).getTime();
        history[date].totalDuration += duration;
      }

      history[date].sessions.push({
        checkIn: checkInTime,
        checkOut: checkOutTime,
        durationInMinutes: Math.floor(duration / (1000 * 60)),
      });
    });

    history[date].totalDuration = Math.floor(
      history[date].totalDuration / (1000 * 60)
    );
  });

  return history;
};
