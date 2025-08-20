import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const employeeSwagger = {
  "/employees": {
    get: {
      summary: "Get all employees",
      tags: ["employees"],
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
  "/employee/{id}": {
    get: {
      summary: "Get the profile of the logged-in user",
      tags: ["employees"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: successResponse,
        404: {
          description: "User profile not found",
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
    patch: {
      summary: "Update the profile of the logged-in user",
      tags: ["employees"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                photo: {
                  type: "string",
                  description: "URL of the profile photo",
                },
                firstName: {
                  type: "string",
                  description: "First name of the user",
                },
                middleName: {
                  type: "string",
                  description: "Middle name of the user",
                },
                lastName: {
                  type: "string",
                  description: "Last name of the user",
                },
                displayName: {
                  type: "string",
                  description: "Display name of the user",
                },
                gender: {
                  type: "string",
                  enum: ["male", "female", "other"],
                  description: "Gender of the user",
                },
                DOB: {
                  type: "string",
                  format: "date",
                  description: "Date of birth of the user",
                },
                maritalStatus: {
                  type: "string",
                  description: "Marital status of the user",
                },
                bloodGrp: {
                  type: "string",
                  description: "Blood group of the user",
                },
                physicallyHandicapped: {
                  type: "string",
                  description: "Whether the user is physically handicapped",
                },
                nationality: {
                  type: "string",
                  description: "Nationality of the user",
                },
                personalEmail: {
                  type: "string",
                  format: "email",
                  description: "Personal email of the user",
                },
                workEmail: {
                  type: "string",
                  format: "email",
                  description: "Work email of the user",
                },
                mobileNo: {
                  type: "string",
                  description: "Mobile number of the user",
                },
                workNo: {
                  type: "string",
                  description: "Work phone number of the user",
                },
                residenceNo: {
                  type: "string",
                  description: "Residence phone number of the user",
                },
                skypeId: {
                  type: "string",
                  description: "Skype ID of the user",
                },
                about: {
                  type: "string",
                  description: "About section for the user",
                },
                hobbies: {
                  type: "string",
                  description: "Hobbies of the user",
                },
                professionalSummary: {
                  type: "string",
                  description: "Professional summary of the user",
                },
              },
              required: ["firstName", "lastName", "workEmail"],
            },
          },
        },
      },
      responses: {
        200: successResponse,
        400: badRequest,
        404: {
          description: "User profile not found",
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
