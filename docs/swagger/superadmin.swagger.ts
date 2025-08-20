import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const superAdminSwagger = {
  "/super-admin/organizations": {
    get: {
      summary: "Get all organizations",
      tags: ["super-admin"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "pageSize",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
          },
          description: "Number of organizations per page",
        },
        {
          in: "query",
          name: "pageNumber",
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
    post: {
      summary: "Create a new organization",
      tags: ["super-admin"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the organization",
                },
                address: {
                  type: "string",
                  description: "Address of the organization",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Email of the organization",
                },
                phone: {
                  type: "string",
                  description: "Phone number of the organization",
                },
              },
              required: ["name", "address", "email", "phone"],
            },
          },
        },
      },
      responses: {
        201: successResponse,
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
  "/super-admin/organizations/{id}": {
    get: {
      summary: "Get an organization by ID",
      tags: ["super-admin"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the organization",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Organization not found",
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
    patch: {
      summary: "Update an organization by ID",
      tags: ["super-admin"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the organization to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Updated name of the organization",
                },
                address: {
                  type: "string",
                  description: "Updated address of the organization",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Updated email of the organization",
                },
                phone: {
                  type: "string",
                  description: "Updated phone number of the organization",
                },
              },
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Organization not found",
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
      summary: "Delete an organization by ID",
      tags: ["super-admin"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the organization to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Organization not found",
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
