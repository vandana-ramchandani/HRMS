import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const glossarySwagger = {
  "/glossary": {
    post: {
      summary: "Create a new glossary term",
      tags: ["glossary"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                term: {
                  type: "string",
                  description: "The term to be added to the glossary",
                },
                definition: {
                  type: "string",
                  description: "The definition of the term",
                },
              },
              required: ["term", "definition"],
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
      summary: "Get all glossary terms",
      tags: ["glossary"],
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
  "/glossary/{id}": {
    patch: {
      summary: "Update a glossary term",
      tags: ["glossary"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the glossary term to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                term: {
                  type: "string",
                  description: "Updated term",
                },
                definition: {
                  type: "string",
                  description: "Updated definition",
                },
              },
              required: ["term", "definition"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
        404: {
          description: "Glossary term not found",
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
      summary: "Delete a glossary term",
      tags: ["glossary"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the glossary term to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Glossary term not found",
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
