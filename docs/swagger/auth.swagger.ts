import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const authSwagger = {
  "/auth/organisation": {
    post: {
      summary: "Register a new organization",
      tags: ["auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "First name of the user",
                },
                lastName: {
                  type: "string",
                  description: "Last name of the user",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Email of the user",
                },
                password: {
                  type: "string",
                  format: "password",
                  description: "Password for the user",
                },
                companyName: {
                  type: "string",
                  description: "Name of the company",
                },
                phnNo: {
                  type: "string",
                  description: "Phone number of the user",
                },
                noOfEmployees: {
                  type: "integer",
                  description: "Number of employees in the organization",
                },
              },
              required: [
                "name",
                "lastName",
                "email",
                "password",
                "companyName",
              ],
            },
          },
        },
      },
      responses: {
        201: successResponse,
        400: badRequest,
      },
    },
  },
  "/auth/login": {
    post: {
      summary: "Login a user",
      tags: ["auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "Email of the user",
                },
                password: {
                  type: "string",
                  format: "password",
                  description: "Password for the user",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/auth/refresh-token": {
    get: {
      summary: "Refresh access token",
      tags: ["auth"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: successResponse,
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                  },
                  message: {
                    type: "string",
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/change-password": {
    patch: {
      summary: "Change user password",
      tags: ["auth"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                currentPassword: {
                  type: "string",
                  format: "password",
                  description: "Current password of the user",
                },
                newPassword: {
                  type: "string",
                  format: "password",
                  description: "New password for the user",
                },
              },
              required: ["currentPassword", "newPassword"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/auth/request-reset-password": {
    post: {
      summary: "Request password reset",
      tags: ["auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "Email of the user requesting password reset",
                },
              },
              required: ["email"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/auth/reset-password": {
    post: {
      summary: "Reset user password",
      tags: ["auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  description: "Password reset token",
                },
                newPassword: {
                  type: "string",
                  format: "password",
                  description: "New password for the user",
                },
              },
              required: ["token", "newPassword"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/auth/check-mail": {
    get: {
      summary: "Check if email exists",
      tags: ["auth"],
      parameters: [
        {
          in: "query",
          name: "email",
          required: true,
          schema: {
            type: "string",
            format: "email",
          },
          description: "Email to check",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
};
