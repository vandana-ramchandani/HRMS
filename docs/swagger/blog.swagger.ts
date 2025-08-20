import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";
export const blogSwagger = {
  "/blogs": {
    get: {
      summary: "Get all blogs",
      tags: ["blogs"],
      parameters: [
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
          },
          description: "Number of blogs per page",
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
        200: {
          description: "Blogs retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                  data: {
                    type: "object",
                    properties: {
                      data: { type: "array", items: { type: "object" } },
                      totalPages: { type: "integer" },
                    },
                  },
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
  "/superadmin/blog/{id}": {
    patch: {
      summary: "Edit a blog",
      tags: ["blogs"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the blog to edit",
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
                  description: "Updated title of the blog",
                },
                content: {
                  type: "string",
                  description: "Updated content of the blog",
                },
                category: {
                  type: "string",
                  description: "Updated category of the blog",
                },
                image: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description: "Updated images for the blog",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Blog updated successfully",
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
    delete: {
      summary: "Delete a blog",
      tags: ["blogs"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the blog to delete",
        },
      ],
      responses: {
        200: {
          description: "Blog deleted successfully",
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
  "/blogs/{category}": {
    get: {
      summary: "Get blogs by category",
      tags: ["blogs"],
      parameters: [
        {
          in: "path",
          name: "category",
          required: true,
          schema: {
            type: "string",
          },
          description: "The categoryId of blogs to retrieve",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
          },
          description: "Number of blogs per page",
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
        200: {
          description: "Blogs retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                  data: {
                    type: "object",
                    properties: {
                      data: { type: "array", items: { type: "object" } },
                      totalPages: { type: "integer" },
                    },
                  },
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
  "/superadmin/blog": {
    post: {
      summary: "Create a new blog",
      tags: ["blogs"],
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
                  description: "Title of the blog",
                },
                content: {
                  type: "string",
                  description: "Content of the blog",
                },
                category: {
                  type: "string",
                  description: "Category id  of the blog",
                },
                image: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description: "Images for the blog",
                },
              },
              required: ["title", "content", "category"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Blog created successfully",
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
};
