import "dotenv/config";
import { imgEdit } from "../img";
import path from "path";

const inputs = {
  a: {
    source: path.join(__dirname, "a", "source.png"),
    mask: path.join(__dirname, "a", "mask.png"),
    prompt:
      "oil painting of a girl with glasses sitting looking at a computer screen, thinking",
  },
  b: {
    source: path.join(__dirname, "b", "source.png"),
    mask: path.join(__dirname, "b", "mask.png"),
    prompt:
      "oil painting of a girl with glasses sitting looking at a computer screen, thinking",
  },
  c: {
    source: path.join(__dirname, "c", "source.png"),
    mask: path.join(__dirname, "c", "mask.png"),
    prompt:
      "oil painting of a girl with glasses sitting looking at a computer screen, thinking",
  },
  d: {
    source: path.join(__dirname, "d", "source.png"),
    mask: path.join(__dirname, "d", "mask.png"),
    prompt:
      "painting of a girl, sitting beside a wall of, papers sticking up the wall, computer screen beside the wall, with glasses, thinking",
  },
};

const main = async () => {
  const key: keyof typeof inputs = "d";
  const source = path.join(inputs[key].source);
  const mask = path.join(inputs[key].mask);
  const prompt = inputs[key].prompt;

  const urls = await imgEdit(source, mask, prompt);
  console.log(JSON.stringify(urls, null, 2));
};

main().catch(console.error);
