import axios from "axios";
import fs from "fs";

export const getVersion = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require("../package.json");
  return version;
};

export const downloadImage = async (url: string, name: string) => {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.pipe(fs.createWriteStream(name));
};
