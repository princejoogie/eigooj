import { type Client, codeBlock, quote } from "discord.js";

import { img } from "../feat/img";
import { shell } from "../feat/shell";
import { anyQ } from "../feat/any-q";
import { botLogger } from "../lib/logger";

export enum COMMAND {
  PING = "ping",
  IMAGE = "image",
  SHELL = "shell",
  ASK = "ask",
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
  {
    name: COMMAND.ASK,
    description: "Generates an answer based on prompt given!",
    options: [
      {
        name: "question",
        description: "The question to generate an answer from",
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
        interaction.editReply({ content: quote(prompt) });
        interaction.followUp({
          content: url,
          ephemeral: false,
        });
      } catch (e) {
        botLogger.log(e);
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
        interaction.editReply({ content: quote(prompt) });
        interaction.followUp({
          content: codeBlock(cmd),
          ephemeral: false,
        });
      } catch (e) {
        botLogger.log(e);
        interaction.reply("Error generating shell command");
      }
    } else if (interaction.commandName === COMMAND.ASK) {
      const prompt = interaction.options.getString("question");

      if (!prompt) {
        interaction.reply("No prompt given!");
        return;
      }

      try {
        interaction.reply("Thinking...");
        const answer = await anyQ(prompt);
        interaction.editReply({ content: quote(prompt) });
        interaction.followUp({
          content: answer,
          ephemeral: false,
        });
      } catch (e) {
        botLogger.log(e);
        interaction.reply("Cannot think of an answer");
      }
    }
  });
};
