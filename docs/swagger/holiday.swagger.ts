import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const holidaySwagger = {
  "/holiday": {
    post: {
      summary: "Create a new holiday",
      tags: ["holidays"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the holiday",
                },
                date: {
                  type: "string",
                  format: "date",
                  description: "Date of the holiday",
                },
                description: {
                  type: "string",
                  description: "Description of the holiday",
                },
                holidayImage: {
                  type: "string",
                  format: "binary",
                  description: "Image for the holiday",
                },
              },
              required: ["title", "date", "description"],
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
      summary: "Get all holidays",
      tags: ["holidays"],
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
  "/holiday/{id}": {
    // get: {
    //   summary: "Get a holiday by ID",
    //   tags: ["holidays"],
    //   security: [{ bearerAuth: [] }],
    //   parameters: [
    //     {
    //       in: "path",
    //       name: "id",
    //       required: true,
    //       schema: {
    //         type: "string",
    //       },
    //       description: "The ID of the holiday",
    //     },
    //   ],
    //   responses: {
    //     200: successResponse,
    //     404: {
    //       description: "Holiday not found",
    //       content: {
    //         "application/json": {
    //           schema: {
    //             type: "object",
    //             properties: {
    //               message: {
    //                 type: "string",
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     500: {
    //       description: "Internal server error",
    //       content: {
    //         "application/json": {
    //           schema: {
    //             type: "object",
    //             properties: {
    //               message: {
    //                 type: "string",
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    patch: {
      summary: "Update a holiday",
      tags: ["holidays"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the holiday to update",
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
                  description: "Updated title of the holiday",
                },
                date: {
                  type: "string",
                  format: "date",
                  description: "Updated date of the holiday",
                },
                description: {
                  type: "string",
                  description: "Updated description of the holiday",
                },
              },
              required: ["title", "date", "description"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "Holiday not found",
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
      summary: "Delete a holiday",
      tags: ["holidays"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the holiday to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "Holiday not found",
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
