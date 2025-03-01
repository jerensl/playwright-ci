export interface ILogger {
        readonly green: string;
        readonly red: string;
        readonly yellow: string;
        readonly blue: string;
        readonly reset: string;
        info(message: string): void;
        warn(message: string): void;
        debug(message: string): void;
        success(message: string): void;
        error(message: string): void;
}

export class MultiLineLogger implements ILogger {
        readonly green: string;
        readonly red: string;
        readonly yellow: string;
        readonly blue: string;
        readonly reset: string;

        constructor() {
                this.green = "\x1b[32m"      // Green
                this.red = "\x1b[31m"        // Red
                this.yellow = "\x1b[33m"     // Yellow
                this.blue = "\x1b[34m"       // Blue
                this.reset = "\x1b[0m"       // Reset color
        }

        info(message: string): void {
                process.stdout.write(`${this.blue}Info: ${this.reset}${message}\n`)
        }
        warn(message: string): void {
                process.stdout.write(`${this.yellow}Warn: ${this.reset}${message}\n`)
        }
        debug(message: string): void {
                process.stdout.write(`${this.yellow}Debug: ${this.reset}${message}\n`)
        }
        success(message: string): void {
                process.stdout.write(`${this.green}Success: ${this.reset}${message}\n`)
        }
        error(message: string): void {
                process.stdout.write(`${this.red}Error: ${this.reset}${message}\n`)
        }
}

export class SingleLineLogger implements ILogger {
        readonly green: string;
        readonly red: string;
        readonly yellow: string;
        readonly blue: string;
        readonly reset: string;

        constructor() {
                this.green = "\x1b[32m"      // Green
                this.red = "\x1b[31m"        // Red
                this.yellow = "\x1b[33m"     // Yellow
                this.blue = "\x1b[34m"       // Blue
                this.reset = "\x1b[0m"       // Reset color
        }

        info(message: string): void {
                process.stdout.clearLine(0)
                process.stdout.write(`${this.blue}Info: ${this.reset}${message}\n`)
        }
        warn(message: string): void {
                process.stdout.clearLine(0)
                process.stdout.write(`${this.yellow}Warn: ${this.reset}${message}\n`)
        }
        debug(message: string): void {
                process.stdout.clearLine(0)
                process.stdout.write(`${this.yellow}Debug: ${this.reset}${message}\n`)
        }
        success(message: string): void {
                process.stdout.clearLine(0)
                process.stdout.write(`${this.green}Success: ${this.reset}${message}\n`)
        }
        error(message: string): void {
                process.stdout.clearLine(0)
                process.stdout.write(`${this.red}Error: ${this.reset}${message}\n`)
        }
}

export default class LoggerFactory {
        public static createLogger(type: string): ILogger {
                if (type === "single") {
                        return new SingleLineLogger()
                } else {
                        return new MultiLineLogger()
                }
        }
}
