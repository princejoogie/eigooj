import { openai } from "../config";
import { appLogger } from "../lib/logger";

export const anyQ = async (query: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: query,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response.data.choices.length <= 0) {
    return "No choices returned";
  }

  if (!response.data.choices[0]?.text) {
    return "No text returned";
  }

  const text = response.data.choices[0].text.trim();
  appLogger.log(text);

  return text;
};
