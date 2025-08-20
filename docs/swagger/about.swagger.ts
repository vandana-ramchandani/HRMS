import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const teamDetailsSwagger = {
  "/our-team": {
    get: {
      summary: "Get all team members",
      tags: ["team"],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            default: 1,
            minimum: 1,
          },
          description: "The page number to retrieve (must be >= 1)",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
            maximum: 100,
          },
          description: "The number of team members per page (1-100)",
        },
      ],
      responses: {
        200: {
          description: "List of team members",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        designation: { type: "string" },
                        image: { type: "string" },
                      },
                    },
                  },
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
  "/superadmin/team/{id}": {
    patch: {
      summary: "Edit an existing team member",
      tags: ["team"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the team member to edit",
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
                  description: "Updated name of the team member",
                },
                designation: {
                  type: "string",
                  description: "Updated designation of the team member",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Updated image of the team member",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Team member updated successfully",
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
        404: {
          description: "Team member not found",
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
      summary: "Delete a team member",
      tags: ["team"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the team member to delete",
        },
      ],
      responses: {
        200: {
          description: "Team member deleted successfully",
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
        404: {
          description: "Team member not found",
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
  "/superadmin/team": {
     post: {
      summary: "Add a new team member",
      tags: ["team"],
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
                  description: "Name of the team member",
                },
                designation: {
                  type: "string",
                  description: "Designation of the team member",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Image of the team member",
                },
              },
              required: ["name", "designation"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Team member added successfully",
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
          description: "Validation error or team member already exists",
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
  "/our-team/{id}": {
    get: {
      summary: "Get details of a specific team member",
      tags: ["team"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the team member to retrieve",
        },
      ],
    responses: {
      200: successResponse,
      404: badRequest,
    }
  }
  }}
