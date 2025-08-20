import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const jobDetailsSwagger = {
  "/job-details": {
    post: {
      summary: "Add job details for a user",
      tags: ["job-details"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string", description: "User's ObjectId" },
                dateOfJoining: { type: "string", format: "date" },
                jobTitlePrimary: { type: "string" },
                jobTitleSecondary: { type: "string" },
                probationStatus: { type: "boolean" },
                probationDate: { type: "string" },
                probationDuration: { type: "string" },
                noticePeriod: { type: "string" },
                workerType: {
                  type: "string",
                  enum: ["Permanent", "Intern"],
                },
                timeType: {
                  type: "string",
                  enum: ["Full Time", "Part Time"],
                },
                contractStatus: { type: "string", default: "Not Applicable" },
                payBand: { type: "string", default: "Not Set" },
                payGrade: { type: "string", default: "Not Set" },
                shift: {
                  type: "string",
                  enum: ["General Shift", "Night Shift"],
                },
                weeklyOffPolicy: { type: "string" },
                leavePlan: { type: "string" },
                holidayCalendar: { type: "string" },
                attendanceCaptureScheme: {
                  type: "string",
                  default: "Head Office",
                },
                attendancePenalisationPolicy: {
                  type: "string",
                  default: "Penalization Policy",
                },
                shiftWeeklyOffRule: { type: "string", default: "Not Set" },
                shiftAllowancePolicy: { type: "string", default: "Not Set" },
                Overtime: { type: "string", default: "Not Set" },
              },
              required: [
                "userId",
                "dateOfJoining",
                "jobTitlePrimary",
                "jobTitleSecondary",
                "probationStatus",
                "noticePeriod",
                "workerType",
                "timeType",
                "shift",
                "leavePlan",
                "holidayCalendar",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Job details added successfully",
        },
        406: {
          description: "Job details already exist for the user",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/job-details/{userId}": {
    
    patch: {
      summary: "Update job details for a user",
      tags: ["job-details"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user whose job details are to be updated",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                dateOfJoining: { type: "string", format: "date" },
                jobTitlePrimary: { type: "string" },
                jobTitleSecondary: { type: "string" },
                probationStatus: { type: "boolean" },
                probationDate: { type: "string" },
                probationDuration: { type: "string" },
                noticePeriod: { type: "string" },
                workerType: {
                  type: "string",
                  enum: ["Permanent", "Intern"],
                },
                timeType: {
                  type: "string",
                  enum: ["Full Time", "Part Time"],
                },
                contractStatus: { type: "string" },
                payBand: { type: "string" },
                payGrade: { type: "string" },
                shift: {
                  type: "string",
                  enum: ["General Shift", "Night Shift"],
                },
                weeklyOffPolicy: { type: "string" },
                leavePlan: { type: "string" },
                holidayCalendar: { type: "string" },
                AttendanceCaptureScheme: { type: "string" },
                attendancePenalisationPolicy: { type: "string" },
                shiftWeeklyOffRule: { type: "string" },
                shiftAllowancePolicy: { type: "string" },
                Overtime: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Job details updated successfully",
        },
        404: {
          description: "User not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    delete: {
      summary: "Delete job details for a user",
      tags: ["job-details"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Job details not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/userprofile/job-detail/{userId}":{
    get: {
      summary: "Get job details for a user by user ID",
      tags: ["job-details"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Job details not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  }
};
