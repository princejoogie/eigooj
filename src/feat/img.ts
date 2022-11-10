import fs from "fs";
import axios from "axios";

import { openai } from "../config";

export const img = async (query: string) => {
  console.log("Generating image from query: ", query);
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
  console.log("Image url: ", url);
  return url;
  /* const name = `${new Date().toISOString()}.png`; */
  /* console.log("Downloading image..."); */
  /* await downloadImage(url, name); */
  /* console.log(`Image saved to ${name}`); */
};

export const downloadImage = async (url: string, name: string) => {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.pipe(fs.createWriteStream(name));
};
