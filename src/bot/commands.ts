import type { Client } from "discord.js";

export enum COMMAND {
  PING = "ping",
}

interface ICommands {
  name: COMMAND;
  description: string;
}

export const commands: ICommands[] = [
  {
    name: COMMAND.PING,
    description: "Replies with Pong!",
  },
];

export const listen = async (client: Client<boolean>) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });
};
