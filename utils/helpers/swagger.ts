import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { NextFunction, Router, Request, Response } from "express";
import { teamDetailsSwagger } from "../../docs/swagger/about.swagger";
import { blogSwagger } from "../../docs/swagger/blog.swagger";
var host = "";
const getHost = (req: Request, res: any, next: NextFunction) => {
  var host = req.headers.host;
  console.log("Host:", host);
  next();
};
import { announcementSwagger } from "../../docs/swagger/announcement.swagger";
import { assetsSwagger } from "../../docs/swagger/assets.swagger";
import { attendanceSwagger } from "../../docs/swagger/attendance.swagger";
import { glossarySwagger } from "../../docs/swagger/glossary.swagger";
import { holidaySwagger } from "../../docs/swagger/holiday.swagger";
import { jobDetailsSwagger } from "../../docs/swagger/job.details.swagger";
import { jobSwagger } from "../../docs/swagger/job.swagger";
import { landingCardSwagger } from "../../docs/swagger/landingcard.swagger";
import { orgSwagger } from "../../docs/swagger/org.swagger";
import { pollSwagger } from "../../docs/swagger/poll.swagger";
import { postSwagger } from "../../docs/swagger/post.swagger";
import { praiseSwagger } from "../../docs/swagger/praise.swagger";
import { ratingSwagger } from "../../docs/swagger/rating.swagger";
import { authSwagger } from "../../docs/swagger/auth.swagger";
import { badgeSwagger } from "../../docs/swagger/badge.swagger";
import { blogCategorySwagger } from "../../docs/swagger/blog.category.swagger";
import { contactSwagger } from "../../docs/swagger/contact.swagger";
import { departmentSwagger } from "../../docs/swagger/department.swagger";
import { documentSwagger } from "../../docs/swagger/document.swagger";
import { employeeSwagger } from "../../docs/swagger/employee.swagger";
import { superAdminSwagger } from "../../docs/swagger/superadmin.swagger";
import { leaveSwagger } from "../../docs/swagger/leave.swagger";
import { projectSwagger } from "../../docs/swagger/project.swagger";
import { userProfileSwagger } from "../../docs/swagger/userprofile.swagger";

const swaggerRouter = Router();

swaggerRouter.use(
  "/",
  swaggerUi.serve,
  (req: any, res: Response, next: NextFunction) => {
    console.log(req.serverUrl);
    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "HR Portal API",
          version: "1.0.0",
          description: "API documentation using Swagger",
        },
        paths: {
          ...authSwagger,
          ...announcementSwagger,
          ...assetsSwagger,
          ...attendanceSwagger,
          ...badgeSwagger,
          ...blogCategorySwagger,
          ...blogSwagger,
          ...contactSwagger,
          ...departmentSwagger,
          ...documentSwagger,
          ...employeeSwagger,
          ...glossarySwagger,
          ...holidaySwagger,
          ...jobDetailsSwagger,
          ...jobSwagger,
          ...landingCardSwagger,
          ...leaveSwagger,
          ...orgSwagger,
          ...projectSwagger,
          ...pollSwagger,
          ...postSwagger,
          ...praiseSwagger,
          ...ratingSwagger,
          ...superAdminSwagger,
          ...teamDetailsSwagger,
          ...userProfileSwagger,
        },
        servers: [
          { url: req.serverUrl || `${req.protocol}://${req.get("host")}/api` },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      apis: ["./routes/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    swaggerUi.setup(swaggerSpec)(req, res, next);
  }
);

export default swaggerRouter;
