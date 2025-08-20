import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const landingCardSwagger = {
  "/homepage-cards": {
    get: {
      summary: "Get all landing cards",
      tags: ["landing-cards"],
      responses: {
        200: successResponse,
        404: {
          description: "Landing cards not found",
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
  }
  
};
