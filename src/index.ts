import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { REST, Routes, Client, GatewayIntentBits } from "discord.js";

import { getVersion } from "./util";

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
    console.log(
      `Server (v${getVersion()}) listening on http://localhost:${PORT}`
    );
  });
};

const startBot = async () => {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];

  await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
    body: commands,
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(DISCORD_TOKEN);

  console.log("Discord bot started!");
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
