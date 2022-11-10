import fs from "fs";
import axios from "axios";
import type { Category } from "@prisma/client";

import { appLogger } from "./lib/logger";
import prisma from "./lib/prisma";

export const getVersion = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require("../package.json");
  return version;
};

export const downloadImage = async (url: string, name: string) => {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.pipe(fs.createWriteStream(name));
};

/* DATABASE HELPERS */
interface QueryProps {
  prompt: string;
  response: string;
  discordUserId: string;
  category: Category;
}

export const saveQuery = async (props: QueryProps) => {
  try {
    const res = await prisma.userQuery.create({
      data: {
        prompt: props.prompt.trim(),
        category: props.category,
        response: props.response.trim(),
        discordUserId: props.discordUserId,
      },
    });
    appLogger.log(`Saved query: ${res.id}`);
  } catch (e) {
    appLogger.error(e);
  }
};

export const getQuery = async (prompt: string, category: Category) => {
  try {
    const res = await prisma.userQuery.findFirst({
      where: { AND: [{ prompt }, { category }] },
    });
    return res;
  } catch (e) {
    appLogger.error(e);
    return null;
  }
};
