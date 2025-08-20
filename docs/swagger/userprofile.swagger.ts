export const userProfileSwagger = {
  "/userprofile/myprofile": {
    get: {
      summary: "Get the profile of the authenticated user",
      tags: ["user-profile"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User profile retrieved successfully",
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
                    example: "User found successfully",
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
                          description: "Name of the user",
                        },
                        email: {
                          type: "string",
                          format: "email",
                          description: "Email of the user",
                        },
                        orgId: {
                          type: "string",
                          description: "Organization ID of the user",
                        },
                        empId: {
                          type: "string",
                          description: "Employee ID of the user",
                        },
                        departmentName: {
                          type: "string",
                          description: "Department name of the user",
                        },
                        photo: {
                          type: "string",
                          format: "url",
                          description: "Profile photo URL of the user",
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
                          type: "boolean",
                          description:
                            "Whether the user is physically handicapped",
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
                    },
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
                  status: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Internal server error",
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
  "/userprofile/": {
    patch: {
      summary: "Update the profile of the authenticated user",
      tags: ["user-profile"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                photo: {
                  type: "string",
                  format: "binary",
                  description: "Profile photo of the user",
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
                  type: "boolean",
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
        200: {
          description: "User profile updated successfully",
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
                    example: "User profile updated successfully",
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                  },
                  data: {
                    type: "object",
                    properties: {
                      userId: {
                        type: "string",
                        description: "ID of the user",
                      },
                      photo: {
                        type: "string",
                        format: "url",
                        description: "Updated profile photo URL",
                      },
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
                      // Add other fields as needed
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid fields or missing required data",
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
                    example: "Invalid fields provided",
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
        401: {
          description: "Unauthorized action",
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
                    example: "Unauthorized",
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
                  status: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Internal server error",
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
};
