import type { Client } from "discord.js";

import { img } from "../feat/img";
import { shell } from "../feat/shell";

export enum COMMAND {
  PING = "ping",
  IMAGE = "image",
  SHELL = "shell",
}

export const commands = [
  {
    name: COMMAND.PING,
    description: "Replies with Pong!",
  },
  {
    name: COMMAND.IMAGE,
    description: "Generates an image based on prompt given!",
    options: [
      {
        name: "prompt",
        description: "The prompt to generate an image from",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: COMMAND.SHELL,
    description: "Generates valid shell command based on prompt given!",
    options: [
      {
        name: "prompt",
        description: "The prompt to generate a shell command from",
        type: 3,
        required: true,
      },
    ],
  },
];

export const listen = async (client: Client<boolean>) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === COMMAND.PING) {
      await interaction.reply("Pong!");
    } else if (interaction.commandName === COMMAND.IMAGE) {
      const prompt = interaction.options.getString("prompt");

      if (!prompt) {
        interaction.reply("No prompt given!");
        return;
      }

      try {
        interaction.reply("Generating image...");
        const url = await img(prompt);
        interaction.followUp({
          content: url,
          ephemeral: true,
        });
      } catch (e) {
        console.log(e);
        interaction.reply("Error generating image");
      }
    } else if (interaction.commandName === COMMAND.SHELL) {
      const prompt = interaction.options.getString("prompt");

      if (!prompt) {
        interaction.reply("No prompt given!");
        return;
      }

      try {
        interaction.reply("Generating shell command...");
        const cmd = await shell(prompt);
        interaction.followUp({
          content: cmd,
          ephemeral: true,
        });
      } catch (e) {
        console.log(e);
        interaction.reply("Error generating shell command");
      }
    }
  });
};
