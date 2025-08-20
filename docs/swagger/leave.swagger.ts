import { badRequest, successResponse } from "./response.swagger";

export const leaveSwagger = {
  "/employee/leave": {
    post: {
      summary: "Apply for leave",
      tags: ["leave"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                leaveType: { type: "string",enum: ["paid", "unpaid"] },
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
                days: { type: "number" },
                reason: { type: "string" },
                notify: { type: "array", items: { type: "string" } },
              },
              required: ["leaveType", "startDate", "endDate", "days", "reason"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Leave applied successfully",
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
        400: {
          description: "Bad request",
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
      },
    },
  },
  "/leaves": {
    get: {
      summary: "Get all leaves ",
      tags: ["leave"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of records per page",
        },
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
      ],
      responses: {
        200: {
          description: "Leaves fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  data: { type: "array", items: { type: "object" } },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
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
      },
    },
  },
  "/leave-request/{id}": {
    patch: {
      summary: "Approve or reject a leave request",
      tags: ["leave"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Leave request ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "string", enum: ["approved", "rejected"] },
                rejectReason: { type: "string" },
              },
              required: ["status"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Leave status updated",
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
        400: {
          description: "Bad request",
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
      },
    },
  },
  "/leaves/{userId}": {
    get: {
      summary: "Get all leaves for a specific user",
      tags: ["leave"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: { type: "string" },
          description: "User ID to fetch leaves for",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of records per page",
        },
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
};