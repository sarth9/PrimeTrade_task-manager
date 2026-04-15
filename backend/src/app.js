import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { env } from "./config/env.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(mongoSanitize());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prime assignment API is running"
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;