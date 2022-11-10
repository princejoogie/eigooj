import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { getVersion } from "./util";

const PORT = process.env["PORT"] ?? 4000;

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));

  app.get("/", (_, res) => {
    return res.send(`eigooj bot v${getVersion()}`);
  });

  app.listen(PORT, () => {
    console.log(
      `Server (v${getVersion()}) listening on http://localhost:${PORT}`
    );
  });
};

const startBot = async () => {
  console.log("Starting bot...");
};

const main = async () => {
  try {
    await Promise.all([startServer(), startBot()]);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
