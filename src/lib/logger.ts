export class Logger {
  constructor(private readonly name: string) {}

  info(...message: any) {
    if (process.env["NODE_ENV"] === "development") {
      console.info(`[${this.name}]`, ...message);
    }
  }

  error(...message: any) {
    if (process.env["NODE_ENV"] === "development") {
      console.error(`[${this.name}]`, ...message);
    }
  }

  warn(...message: any) {
    if (process.env["NODE_ENV"] === "development") {
      console.warn(`[${this.name}]`, ...message);
    }
  }

  log(...message: any) {
    if (process.env["NODE_ENV"] === "development") {
      console.log(`[${this.name}]`, ...message);
    }
  }
}

export const serverLogger = new Logger("SERVER");
export const botLogger = new Logger("BOT");
export const appLogger = new Logger("APP");
