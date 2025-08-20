import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const contactSwagger = {
  "/contact": {
    post: {
      summary: "Submit a contact form",
      tags: ["contact"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the person submitting the contact form",
                },
                companyName: {
                  type: "string",
                  description: "Company name of the person",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Email address of the person",
                },
                countryCode: {
                  type: "string",
                  description: "Country code of the phone number",
                },
                phone: {
                  type: "string",
                  description: "Phone number of the person",
                },
                message: {
                  type: "string",
                  description: "Message content",
                },
              },
              required: [
                "name",
                "companyName",
                "email",
                "countryCode",
                "phone",
                "message",
              ],
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
  "/superadmin/contact": {
    get: {
      summary: "Get all contact details",
      tags: ["contact"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            default: 1,
            minimum: 1,
          },
          description: "The page number to retrieve",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 9,
            minimum: 1,
          },
          description: "The number of items per page",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Data not found",
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
  "/superadmin/contact/{id}": {
    delete: {
      summary: "Delete a contact by ID",
      tags: ["contact"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the contact to delete",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
        404: {
          description: "Contact not found",
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
