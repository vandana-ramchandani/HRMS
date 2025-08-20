export const projectSwagger = {
  "/project": {
    post: {
      summary: "Add a new project",
      tags: ["project"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                projectName: { type: "string" },
                clientName: { type: "string" },
                billingType: { type: "string" },
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
                projectManager: { type: "string" },
              },
              required: [
                "projectName",
                "clientName",
                "billingType",
                "startDate",
                "projectManager",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Project added successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get all projects for a user",
      tags: ["project"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of records per page",
        },
        {
          in: "query",
          name: "status",
          schema: {
            type: "string",
            enum: ["Active", "Completed", "On Hold", "Cancelled"],
          },
          description: "Project status filter",
        },
        {
          in: "query",
          name: "billingType",
          schema: {
            type: "string",
            enum: ["T&M", "Fixed", "Recurring", "Milestone billing"],
          },
          description: "Billing type filter",
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search keyword",
        },
      ],
      responses: {
        200: {
          description: "Projects fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { type: "object" }, // You can define the project schema here if needed
                      },
                      totalPages: { type: "integer" },
                    },
                  },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "boolean" },
                  message: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
  },
};
