import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { getVersion } from "./util";

const PORT = process.env["PORT"] ?? 4000;

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));

  app.listen(PORT, () => {
    console.log(
      `Server (v${getVersion()}) listening on http://localhost:${PORT}`
    );
  });
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
