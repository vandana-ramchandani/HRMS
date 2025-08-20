export const attendanceSwagger = {
  "/employee/attendance/checkin": {
    post: {
      summary: "Check-in for attendance",
      tags: ["attendance"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User successfully checked in",
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
                    example: "Checked in successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      userId: {
                        type: "string",
                        description: "ID of the user",
                      },
                      checkInTime: {
                        type: "string",
                        format: "date-time",
                        description: "Check-in time",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Error during check-in",
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
                    example: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/employee/attendance/checkout": {
    post: {
      summary: "Check-out for attendance",
      tags: ["attendance"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User successfully checked out",
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
                    example: "Checked out successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      userId: {
                        type: "string",
                        description: "ID of the user",
                      },
                      checkOutTime: {
                        type: "string",
                        format: "date-time",
                        description: "Check-out time",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Error during check-out",
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
                    example: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/employee/attendance/total-time": {
    get: {
      summary: "Get total attendance duration for a specific date",
      tags: ["attendance"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "date",
          schema: {
            type: "string",
            format: "date",
          },
          description:
            "Date for which to calculate total duration (default: today)",
        },
      ],
      responses: {
        200: {
          description: "Total attendance duration calculated successfully",
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
                    example: "Total duration calculated successfully",
                  },
                  data: {
                    type: "string",
                    description: "Total duration in hours and minutes",
                    example: "8 hours 30 minutes",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Error during duration calculation",
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
                    example: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/employee/attendance/history": {
    get: {
      summary: "Get attendance history for the authenticated user",
      tags: ["attendance"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Attendance history fetched successfully",
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
                    example: "Attendance history fetched successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        date: {
                          type: "string",
                          format: "date",
                          description: "Date of attendance",
                        },
                        checkInTime: {
                          type: "string",
                          format: "date-time",
                          description: "Check-in time",
                        },
                        checkOutTime: {
                          type: "string",
                          format: "date-time",
                          description: "Check-out time",
                        },
                        totalDuration: {
                          type: "string",
                          description: "Total duration for the day",
                          example: "8 hours 30 minutes",
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
          description: "Error fetching attendance history",
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
                    example: "Error message",
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
