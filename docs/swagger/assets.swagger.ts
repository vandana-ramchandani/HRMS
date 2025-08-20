import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const assetsSwagger = {
  "/userprofile/assets": {
    post: {
      summary: "Assign an asset to a user",
      tags: ["assets"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                requestItem: {
                  type: "string",
                  description: "The asset to be assigned",
                },
              },
              required: ["requestItem"],
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
  "/assets/{id}": {
    patch: {
      summary: "Update the status of an asset request",
      tags: ["assets"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the asset request",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                requestStatus: {
                  type: "string",
                  enum: ["approved", "rejected", "pending"],
                  description: "The new status of the asset request",
                },
              },
              required: ["requestStatus"],
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
  "/assets-recieved/{id}": {
    patch: {
      summary: "Mark an asset as received",
      tags: ["assets"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the asset",
        },
      ],
      responses: {
        200: successResponse,
        404: badRequest,
      },
    },
  },
  "/assets-return/{id}": {
    patch: {
      summary: "Mark an asset as returned",
      tags: ["assets"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the asset",
        },
      ],
      responses: {
        200: successResponse,
        404: badRequest,
      },
    },
  },
  "/userprofile/assets-request": {
    get: {
      summary: "Get all asset requests for a user",
      tags: ["assets"],
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
            default: 10,
            minimum: 1,
          },
          description: "The number of items per page",
        },
        {
          in: "query",
          name: "search",
          schema: {
            type: "string",
          },
          description: "Search term for filtering asset requests",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/userprofile/assigned-assets": {
    get: {
      summary: "Get all assigned assets for a user",
      tags: ["assets"],
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
            default: 10,
            minimum: 1,
          },
          description: "The number of items per page",
        },
        {
          in: "query",
          name: "search",
          schema: {
            type: "string",
          },
          description: "Search term for filtering asset requests",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
  "/assets": {
    get: {
      summary: "Get all assets",
      tags: ["assets"],
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
            default: 10,
            minimum: 1,
          },
          description: "The number of items per page",
        },
        {
          in: "query",
          name: "status",
          schema: {
            type: "string",
            enum: ["approved", "rejected", "pending"],
          },
          description: "Filter assets by status",
        },
        {
          in: "query",
          name: "search",
          schema: {
            type: "string",
          },
          description: "Search term for filtering assets",
        },
      ],
      responses: {
        200: successResponse,
        400: badRequest,
      },
    },
  },
};
