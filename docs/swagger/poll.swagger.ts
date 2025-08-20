import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const pollSwagger = {
  "/poll": {
    post: {
      summary: "Create a new poll",
      tags: ["polls"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the poll",
                },
                options: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "Options for the poll (minimum 2 options required)",
                },
                expiresAt: {
                  type: "string",
                  format: "date-time",
                  description: "Expiration date and time of the poll",
                },
                departments: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Departments allowed to vote in the poll",
                },
                isAnonymous: {
                  type: "boolean",
                  description: "Whether the poll is anonymous",
                },
              },
              required: ["title", "options", "expiresAt", "departments"],
            },
          },
        },
      },
      responses: {
        201: successResponse,
        400: badRequest,
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
  "/polls": {
    get: {
      summary: "Get all polls",
      tags: ["polls"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "departmentId",
          schema: {
            type: "string",
          },
          description: "Filter polls by department ID",
        },
      ],
      responses: {
        200: successResponse,
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
  "/poll/{id}": {
    get: {
      summary: "Get a poll by ID",
      tags: ["polls"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the poll",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Poll not found",
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
    delete: {
      summary: "Delete a poll",
      tags: ["polls"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the poll to delete",
        },
      ],
      responses: {
        200: successResponse,
        403: {
          description: "Poll could not be deleted",
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
};
