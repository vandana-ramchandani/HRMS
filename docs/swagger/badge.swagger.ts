import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const badgeSwagger = {
  "/badge": {
    post: {
      summary: "Add a new badge",
      tags: ["badges"],
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
                  description: "Title of the badge",
                },
                description: {
                  type: "string",
                  description: "Description of the badge",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Image for the badge",
                },
              },
              required: ["title", "description"],
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
    get: {
      summary: "Get all badges",
      tags: ["badges"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/badge/{id}": {
    get: {
      summary: "Get a badge by ID",
      tags: ["badges"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the badge",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Badge not found",
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
        400: badRequest,
      },
    },
    patch: {
      summary: "Edit a badge",
      tags: ["badges"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the badge to edit",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Updated title of the badge",
                },
                description: {
                  type: "string",
                  description: "Updated description of the badge",
                },
              },
              required: ["title", "description"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Badge not found",
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
        400: badRequest,
      },
    },
    delete: {
      summary: "Delete a badge",
      tags: ["badges"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the badge to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Badge not found",
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
        400: badRequest,
      },
    },
  },
};
