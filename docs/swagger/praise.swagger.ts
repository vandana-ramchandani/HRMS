import { get } from "http";
import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const praiseSwagger = {
  "/praise": {
    post: {
      summary: "Create a new praise",
      tags: ["praises"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                mentions: {
                  type: "string",
                  description:
                    'JSON string of user IDs (e.g. ["userId1", "userId2"])',
                },
                description: {
                  type: "string",
                  description: "Description of the praise",
                },
                badgeId: {
                  type: "string",
                  description: "ID of the badge",
                },
                image: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description: "Multiple image files for praise",
                },
              },
              required: ["mentions", "description", "badgeId"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Praise created successfully",
        },
        400: {
          description: "Bad request",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    get: {
      summary: "Get all praises",
      tags: ["praises"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
          },
          description: "Number of praises per page",
        },
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            default: 1,
            minimum: 1,
          },
          description: "Page number for pagination",
        },
      ],
      responses: {
        200: successResponse,
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
  "/praise/{id}": {
    patch: {
      summary: "Update a praise",
      tags: ["praises"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the praise to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                mentions: {
                  type: "string",
                  description: "JSON string of updated user mentions",
                },
                description: {
                  type: "string",
                  description: "Updated description of the praise",
                },
                badgeId: {
                  type: "string",
                  description: "Updated badge ID associated with the praise",
                },
              },
              required: ["mentions", "description", "badgeId"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
        404: {
          description: "Praise not found",
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
      summary: "Delete a praise",
      tags: ["praises"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the praise to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Praise not found",
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
    get: {
      summary: "Get a specific praise",
      tags: ["praises"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the praise to retrieve",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
        404: {
          description: "Praise not found",
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
