import { badRequest, successResponse } from "../swagger/response.swagger";

export const documentSwagger = {
  "/userprofile/documents": {
    post: {
      summary: "Upload a new document (PDF)",
      tags: ["documents"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                pdf: {
                  type: "string",
                  format: "binary",
                },
                title: { type: "string" },
                name: { type: "string" },
                documentNumber: { type: "string" },
                address: { type: "string" },
                dob: { type: "string", format: "date" },
                gender: {
                  type: "string",
                  enum: [
                    "Male",
                    "Female",
                    "Non-Binary",
                    "Prefer not to say",
                    "Transgender",
                  ],
                },
                parentName: { type: "string" },
                issuedOn: { type: "string", format: "date" },
              },
              required: [
                "pdf",
                "title",
                "name",
                "documentNumber",
                "address",
                "dob",
                "gender",
                "parentName",
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
        },
      },
    },
    get: {
      summary: "Get all uploaded documents",
      tags: ["documents"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: successResponse,
        500: {
          description: "Internal server error",
        },
      },
    },
  },

  "/userprofile/documents/{id}": {
    get: {
      summary: "Get a document by ID",
      tags: ["documents"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Document ID",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Document not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    put: {
      summary: "Edit a document's data and file",
      tags: ["documents"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Document ID to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
                title: { type: "string" },
                name: { type: "string" },
                documentNumber: { type: "string" },
                address: { type: "string" },
                dob: { type: "string", format: "date" },
                gender: {
                  type: "string",
                  enum: [
                    "Male",
                    "Female",
                    "Non-Binary",
                    "Prefer not to say",
                    "Transgender",
                  ],
                },
                parentName: { type: "string" },
                issuedOn: { type: "string", format: "date" },
              },
              required: ["title"], // you can add others if needed
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Document not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    delete: {
      summary: "Delete a document by ID",
      tags: ["documents"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Document ID to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Document not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};
