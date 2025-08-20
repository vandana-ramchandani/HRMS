import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const announcementSwagger = {
  "/announcements": {
    post: {
      summary: "Create a new announcement",
      tags: ["announcements"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the announcement",
                },
                message: {
                  type: "string",
                  description: "Message content of the announcement",
                },
                type: {
                  type: "string",
                  enum: ["general", "event"],
                  description: "Type of the announcement",
                },
                status: {
                  type: "string",
                  enum: ["active", "closed"],
                  description: "Status of the announcement",
                },
                photo: {
                  type: "string",
                  format: "binary",
                  description: "Photo for the announcement",
                },
              },
              required: ["title", "message", "type", "status"],
            },
          },
        },
      },
      responses: {
        201: successResponse,
        400: badRequest,
      },
    },
    get: {
      summary: "Get all announcements",
      tags: ["announcements"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "range",
          schema: {
            type: "string",
            enum: ["7", "14", "30"],
          },
          description:
            "Filter announcements created in the last 7, 14, or 30 days",
        },
        {
          in: "query",
          name: "type",
          schema: {
            type: "string",
            enum: ["general", "event", "all"],
          },
          description: "Filter announcements by type",
        },
        {
          in: "query",
          name: "status",
          schema: {
            type: "string",
            enum: ["active", "closed"],
          },
          description: "Filter announcements by status",
        },
        {
          in: "query",
          name: "startdate",
          schema: {
            type: "string",
            format: "date",
          },
          description: "Start date for filtering announcements",
        },
        {
          in: "query",
          name: "enddate",
          schema: {
            type: "string",
            format: "date",
          },
          description: "End date for filtering announcements",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/announcement/{id}": {
    patch: {
      summary: "Update an announcement",
      tags: ["announcements"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the announcement to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the announcement",
                },
                message: {
                  type: "string",
                  description: "Message content of the announcement",
                },
                type: {
                  type: "string",
                  enum: ["general", "event"],
                  description: "Type of the announcement",
                },
                status: {
                  type: "string",
                  enum: ["active", "closed"],
                  description: "Status of the announcement",
                },
                photo: {
                  type: "string",
                  format: "binary",
                  description: "Photo for the announcement",
                },
              },
              required: ["title", "message"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
        403: {
          description: "Unauthorized action",
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
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete an announcement",
      tags: ["announcements"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the announcement to delete",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
        403: {
          description: "Unauthorized action",
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
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
