import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { REST, Routes, Client, GatewayIntentBits } from "discord.js";

import { getVersion } from "./util";
import { commands, listen } from "./bot/commands";
import { botLogger, serverLogger } from "./lib/logger";

const PORT = process.env["PORT"] ?? 4000;
const DISCORD_TOKEN = process.env["DISCORD_TOKEN"] ?? "";
const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"] ?? "";

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
    serverLogger.log(
      `Server (v${getVersion()}) listening on http://localhost:${PORT}`
    );
  });
};

const startBot = async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  listen(client);

  client.login(DISCORD_TOKEN);

  botLogger.log(`Bot (v${getVersion()}) started`);
};

export const registerCommands = async () => {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  botLogger.log("Registering slash commands...");
  botLogger.log(JSON.stringify(commands, null, 2));
  await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
    body: commands,
  });
  botLogger.log("Successfully registered application commands.");
};

const main = async () => {
  if (process.argv[2] === "register") {
    await registerCommands();
  }

  try {
    await Promise.all([startServer(), startBot()]);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
