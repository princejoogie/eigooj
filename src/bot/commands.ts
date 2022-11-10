import { type Client, codeBlock, quote } from "discord.js";

import { img } from "../feat/img";
import { shell } from "../feat/shell";
import { anyQ } from "../feat/any-q";
import { botLogger } from "../lib/logger";
import { getQuery, saveQuery } from "../util";

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
      try {
        const prompt = interaction.options.getString("prompt");

        if (!prompt) {
          await interaction.reply("No prompt given!");
          return;
        }

        await interaction.reply("Generating image...");
        const cachedResult = await getQuery(prompt, "IMAGE");

        const res = cachedResult ? cachedResult.response : await img(prompt);
        await interaction.editReply({ content: quote(prompt) });
        await interaction.followUp({
          content: res,
          ephemeral: false,
        });

        if (!cachedResult) {
          await saveQuery({
            prompt,
            discordUserId: interaction.user.id,
            response: res,
            category: "IMAGE",
          });
        }
      } catch (e) {
        botLogger.log(e);
        await interaction.reply("Error generating image");
      }
    } else if (interaction.commandName === COMMAND.SHELL) {
      try {
        const prompt = interaction.options.getString("prompt");

        if (!prompt) {
          await interaction.reply("No prompt given!");
          return;
        }

        await interaction.reply("Generating shell command...");
        const cachedResult = await getQuery(prompt, "SHELL");

        const res = cachedResult ? cachedResult.response : await shell(prompt);
        await interaction.editReply({ content: quote(prompt) });
        await interaction.followUp({
          content: codeBlock(res),
          ephemeral: false,
        });

        if (!cachedResult) {
          await saveQuery({
            prompt,
            discordUserId: interaction.user.id,
            response: res,
            category: "SHELL",
          });
        }
      } catch (e) {
        botLogger.log(e);
        await interaction.reply(
          "Theres either an error or ur prompt is not allowed. KEKW"
        );
      }
    } else if (interaction.commandName === COMMAND.ASK) {
      try {
        const prompt = interaction.options.getString("question");

        if (!prompt) {
          await interaction.reply("No prompt given!");
          return;
        }

        await interaction.reply("Thinking...");
        const cachedResult = await getQuery(prompt, "ASK");

        const res = cachedResult ? cachedResult.response : await anyQ(prompt);
        await interaction.editReply({ content: quote(prompt) });
        await interaction.followUp({
          content: res,
          ephemeral: false,
        });

        if (!cachedResult) {
          await saveQuery({
            prompt,
            discordUserId: interaction.user.id,
            response: res,
            category: "ASK",
          });
        }
      } catch (e) {
        botLogger.log(e);
        await interaction.reply("Cannot think of an answer");
      }
    }
  });
};
