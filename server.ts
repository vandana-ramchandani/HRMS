import express, { NextFunction, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import orgRoutes from "./routes/orgRoutes";
import { SUCCESS_MESSAGES } from "./constants/successmessage";
import { ERROR_MESSAGES } from "./constants/errorMessage";
import employeeRoutes from "./routes/employee.routes";
import { handleError } from "./utils/helpers/global.error.handler";
import { morganMiddleware } from "./utils/helpers/logger";
import cookieParser from "cookie-parser";
import { seedSuperAdmin } from "./seeder/superadmin.seeder";
import holidayRoutes from "./routes/holiday.routes";
import superAdminRoutes from "./routes/superAdmin.routes";
import postRoutes from "./routes/post.router";
import userProfileRoutes from "./routes/user.profile.routes";
import publicRoutes from "./routes/publicRoutes";
import announcementRoutes from "./routes/announcement.routes";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/errorHandler.middleware";
import swaggerRouter from "./utils/helpers/swagger";
import pollRoutes from "./routes/pollRoutes";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();
import "./config/passport.config";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

export { io };

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  })
);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("voteUpdate", (msg) => {
    console.log("Received vote:", msg);
    io.emit("voteUpdate", msg);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(morganMiddleware);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());

app.use((req: any, res: Response, next: NextFunction) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/api`;
  req.serverUrl = url;

  next();
});

app.use("/docs", swaggerRouter);
app.use("/api/auth", authRoutes);
app.use("/api", orgRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", pollRoutes);
app.use("/api/userprofile", userProfileRoutes);
app.use("/api", publicRoutes);
app.use("/api", announcementRoutes);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    return handleError(err, res);
  }
);
app.use(errorHandler);
app.use(notFoundHandler);
connectDB()
  .then(async () => {
    console.log(SUCCESS_MESSAGES.MONGO_CONNECTION_SUCCESS);
    await seedSuperAdmin();
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
      console.log(SUCCESS_MESSAGES.SERVER_RUNNING(port));
    });
  })
  .catch((err) => {
    console.error(ERROR_MESSAGES.MONGO_CONNECTION_FAILED, err);
  });
