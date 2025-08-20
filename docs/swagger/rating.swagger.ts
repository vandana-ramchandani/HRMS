import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const ratingSwagger = {
  "/app-rating": {
    get: {
      summary: "Get all ratings",
      tags: ["ratings"],

      responses: {
        200: successResponse,
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
  }
};
