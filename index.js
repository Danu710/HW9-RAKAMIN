import express from "express";
import cors from "cors";
import UserRoute from "./route/UserRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/swagger.json" assert { type: "json" };

const app = express();
const PORT = 8080 || process.env.PORT;

// Include the controller as middleware
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/ping", (req, res) => {
  res.json({ ping: true });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
