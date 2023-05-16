import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  swaggerDefinition: {
    info: {
      title: "Judul Dokumentasi API",
      description: "Deskripsi Dokumentasi API",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
