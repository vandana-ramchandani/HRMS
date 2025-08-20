import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const blogCategorySwagger = {
  "/blogs-category": {
    get: {
      summary: "Get all blog categories",
      tags: ["blog-categories"],
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
  "/superadmin/blog-category/{id}": {
    get: {
      summary: "Get a blog category by ID",
      tags: ["blog-categories"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the blog category",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Blog category not found",
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
      summary: "Edit a blog category",
      tags: ["blog-categories"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the blog category to edit",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Updated name of the blog category",
                },
                description: {
                  type: "string",
                  description: "Updated description of the blog category",
                },
                banner: {
                  type: "string",
                  format: "binary",
                  description: "Updated image for the blog category",
                },
              },
              required: ["name", "description"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Blog category not found",
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
      summary: "Delete a blog category",
      tags: ["blog-categories"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the blog category to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Blog category not found",
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
  "/superadmin/blog-category": {
    post: {
      summary: "Create a new blog category",
      tags: ["blog-categories"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the blog category",
                },
                description: {
                  type: "string",
                  description: "Description of the blog category",
                },
                banner: {
                  type: "string",
                  format: "binary",
                  description: "Image for the blog category",
                },
              },
              required: ["name", "description"],
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
};
