import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const departmentSwagger = {
  "/dept": {
    post: {
      summary: "Create a new department",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                departmentName: {
                  type: "string",
                  description: "Name of the department",
                },
              },
              required: ["departmentName"],
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
      summary: "Get all departments",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
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
  "/dept/{id}": {
    get: {
      summary: "Get a department by ID",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the department",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Department not found",
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
    put: {
      summary: "Update a department",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the department to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                departmentName: {
                  type: "string",
                  description: "Updated name of the department",
                },
              },
              required: ["departmentName"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Department not found",
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
      summary: "Delete a department",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the department to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Department not found",
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
  "/dept/users/{departmentId}": {
    get: {
      summary: "Get all users in a department",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "departmentId",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the department",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Department not found",
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
  "/search": {
    get: {
      summary: "Search for users by name and department",
      tags: ["departments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "name",
          required: true,
          schema: {
            type: "string",
          },
          description: "The name of the user to search for",
        },
        {
          in: "query",
          name: "department",
          required: true,
          schema: {
            type: "string",
          },
          description: "The department to search in",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Users not found",
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
