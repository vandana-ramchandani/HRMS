export const badRequest = {
  description: "Bad Request",
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
};
export const successResponse = {
  description: "Success",
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
};
