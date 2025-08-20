import { badRequest } from "../swagger/response.swagger";
import { successResponse } from "../swagger/response.swagger";

export const orgSwagger = {
  "/employees": {
    post: {
      summary: "Create a new user in the organization",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  description: "First name of the user",
                },
                lastName: {
                  type: "string",
                  description: "Last name of the user",
                },
                workEmail: {
                  type: "string",
                  format: "email",
                  description: "Work email of the user",
                },
                password: {
                  type: "string",
                  description: "Password for the user account",
                },
                departmentName: {
                  type: "string",
                  description: "Department to which the user belongs",
                },
              },
              required: [
                "firstName",
                "lastName",
                "workEmail",
                "password",
                "departmentName",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "User created successfully",
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        userid: {
                          type: "string",
                          description: "ID of the created user",
                        },
                        username: {
                          type: "string",
                          description: "Full name of the created user",
                        },
                        empId: {
                          type: "string",
                          description: "Generated employee ID",
                        },
                        workEmail: {
                          type: "string",
                          format: "email",
                          description: "Work email of the created user",
                        },
                        departmentName: {
                          type: "string",
                          description: "Department of the created user",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or user already exists",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "User already exists",
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
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get all users in the organization",
      tags: ["organization"],
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
          description: "Page number for pagination",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
            minimum: 1,
          },
          description: "Number of users per page",
        },
      ],
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
  },
  "/employee/{id}": {
    get: {
      summary: "Get a user by ID",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "User not found",
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
      summary: "Update a user by ID",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userid: {
                  type: "string",
                  description: "ID of the created user",
                },
                username: {
                  type: "string",
                  description: "Full name of the created user",
                },
                empId: {
                  type: "string",
                  description: "Generated employee ID",
                },
                workEmail: {
                  type: "string",
                  format: "email",
                  description: "Work email of the created user",
                },
                departmentName: {
                  type: "string",
                  description: "Department of the created user",
                },
              },
            },
          },
        },
      },
      responses: {
        200: successResponse,
        404: {
          description: "User not found",
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
      summary: "Delete a user by ID",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user to delete",
        },
      ],
      responses: {
        200: successResponse,
        404: {
          description: "User not found",
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

  "/org/logo": {
    post: {
      summary: "Upload organization logo",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                logo: {
                  type: "string",
                  format: "binary",
                  description: "The logo file to upload",
                },
              },
              required: ["logo"],
            },
          },
        },
      },
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
    delete: {
      summary: "Delete organization logo",
      tags: ["organization"],
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
  "/setprofile": {
    post: {
      summary: "Create a new employee profile",
      tags: ["organization"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                  description:
                    "The ID of the user for whom the profile is being created",
                },
                photo: {
                  type: "string",
                  format: "binary",
                  description: "Profile photo of the employee",
                },
                firstName: {
                  type: "string",
                  description: "First name of the employee",
                },
                middleName: {
                  type: "string",
                  description: "Middle name of the employee",
                },
                lastName: {
                  type: "string",
                  description: "Last name of the employee",
                },
                displayName: {
                  type: "string",
                  description: "Display name of the employee",
                },
                gender: {
                  type: "string",
                  description: "Gender of the employee",
                },
                DOB: {
                  type: "string",
                  format: "date",
                  description: "Date of birth of the employee",
                },
                maritalStatus: {
                  type: "string",
                  description: "Marital status of the employee",
                },
                bloodGrp: {
                  type: "string",
                  description: "Blood group of the employee",
                },
                physicallyHandicapped: {
                  type: "boolean",
                  description: "Whether the employee is physically handicapped",
                },
                nationality: {
                  type: "string",
                  description: "Nationality of the employee",
                },
                personalEmail: {
                  type: "string",
                  format: "email",
                  description: "Personal email of the employee",
                },
                workEmail: {
                  type: "string",
                  format: "email",
                  description: "Work email of the employee",
                },
                mobileNo: {
                  type: "string",
                  description: "Mobile number of the employee",
                },
                workNo: {
                  type: "string",
                  description: "Work phone number of the employee",
                },
                residenceNo: {
                  type: "string",
                  description: "Residence phone number of the employee",
                },
                skypeId: {
                  type: "string",
                  description: "Skype ID of the employee",
                },
                about: {
                  type: "string",
                  description: "About section for the employee",
                },
                hobbies: {
                  type: "string",
                  description: "Hobbies of the employee",
                },
                professionalSummary: {
                  type: "string",
                  description: "Professional summary of the employee",
                },
                reportingManager: {
                  type: "string",
                  description: "ID of the reporting manager",
                },
              },
              required: ["userId", "firstName", "lastName", "workEmail"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Employee profile created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Employee profile created successfully",
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          description: "First name of the employee",
                        },
                        workEmail: {
                          type: "string",
                          format: "email",
                          description: "Work email of the employee",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or user already exists",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "User already exists or invalid data",
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
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "User not found",
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
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
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
