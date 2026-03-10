import express from "express";

import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";

export async function startServer() {
  await connectDatabase(env.mongodbUri);

  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
  });

  app.use("/roles", roleRoutes);
  app.use("/", userRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`);
  });
}
