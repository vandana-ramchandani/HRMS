import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const jobSwagger = {
  "/superadmin/job": {
    post: {
      summary: "Create a new job",
      tags: ["jobs"],
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
                  description: "Title of the job",
                },
                location: {
                  type: "string",
                  description: "Location of the job",
                },
                description: {
                  type: "string",
                  description: "Description of the job",
                },
                applyLink: {
                  type: "string",
                  format: "url",
                  description: "Link to apply for the job",
                },
              },
              required: ["title", "location", "description", "applyLink"],
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
  "/jobs": {
    get: {
      summary: "Get all jobs",
      tags: ["jobs"],
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
          description: "Number of jobs per page",
        },
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            default: 1,
            minimum: 1,
          },
          description: "Page number to retrieve",
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
  "/superadmin/job/{id}": {
    patch: {
      summary: "Update a job",
      tags: ["jobs"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the job to update",
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
                  description: "Updated title of the job",
                },
                location: {
                  type: "string",
                  description: "Updated location of the job",
                },
                description: {
                  type: "string",
                  description: "Updated description of the job",
                },
                applyLink: {
                  type: "string",
                  format: "url",
                  description: "Updated link to apply for the job",
                },
              },
              required: ["title", "location", "description", "applyLink"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Job not found",
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
      summary: "Delete a job",
      tags: ["jobs"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the job to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Job not found",
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
  "/job/{id}": {
    get: {
      summary: "Get a job by ID",
      tags: ["jobs"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the job",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Job not found",
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
  "/jobs/career-content": {
    get: {
      summary: "Get career page content",
      tags: ["jobs"],
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
};
