import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime Backend Assignment API",
      version: "1.0.0",
      description: "Scalable REST API with Authentication, RBAC, and CRUD"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.paths = {
  "/auth/register": {
    post: {
      summary: "Register user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" }
              }
            }
          }
        }
      },
      responses: { 201: { description: "User registered" } }
    }
  },
  "/auth/login": {
    post: {
      summary: "Login user",
      responses: { 200: { description: "Login successful" } }
    }
  },
  "/auth/me": {
    get: {
      summary: "Get current user",
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: "Current user fetched" } }
    }
  },
  "/tasks": {
    get: {
      summary: "Get tasks",
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: "Tasks fetched" } }
    },
    post: {
      summary: "Create task",
      security: [{ bearerAuth: [] }],
      responses: { 201: { description: "Task created" } }
    }
  },
  "/tasks/{id}": {
    get: {
      summary: "Get task by id",
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true }],
      responses: { 200: { description: "Task fetched" } }
    },
    put: {
      summary: "Update task",
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true }],
      responses: { 200: { description: "Task updated" } }
    },
    delete: {
      summary: "Delete task",
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true }],
      responses: { 200: { description: "Task deleted" } }
    }
  }
};

export { swaggerSpec, swaggerUi };