import { createReadStream } from "fs";
import { openai } from "../config";
import { appLogger } from "../lib/logger";

export const img = async (query: string) => {
  try {
    appLogger.log("img:", query);
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: "512x512",
    });

    if (response.data.data.length <= 0) {
      return "No choices returned";
    }

    if (!response.data.data[0]?.url) {
      return "No url returned";
    }

    const url = response.data.data[0].url.trim();
    appLogger.log(url);

    return url;
  } catch (e) {
    appLogger.error(e);
    return "Theres either an error or ur prompt is not allowed. :KEKW:";
  }
};

export const imgVariation = async (source: string) => {
  try {
    const response = await openai.createImageVariation(
      createReadStream(source),
      4,
      "512x512"
    );

    if (response.data.data.length <= 0) {
      return "No choices returned";
    }

    if (!response.data.data[0]?.url) {
      return "No url returned";
    }

    const urls: string[] = [];

    response.data.data.forEach((x) => {
      if (x.url) urls.push(x.url.trim());
    });
    appLogger.log(urls);

    return urls;
  } catch (e) {
    appLogger.error(e);
    return "Theres either an error or ur prompt is not allowed. :KEKW:";
  }
};

export const imgEdit = async (source: string, mask: string, prompt: string) => {
  try {
    appLogger.log("imgCompletion:", source, mask);
    const response = await openai.createImageEdit(
      createReadStream(source),
      createReadStream(mask),
      prompt,
      4,
      "512x512"
    );

    if (response.data.data.length <= 0) {
      return "No choices returned";
    }

    if (!response.data.data[0]?.url) {
      return "No url returned";
    }

    const urls: string[] = [];

    response.data.data.forEach((x) => {
      if (x.url) urls.push(x.url.trim());
    });
    appLogger.log(urls);

    return urls;
  } catch (e) {
    appLogger.error(e);
    return "Theres either an error or ur prompt is not allowed. :KEKW:";
  }
};
