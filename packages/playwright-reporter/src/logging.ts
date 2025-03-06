import dayjs, { Dayjs } from "dayjs"

export abstract class Logger {
        readonly green: string;
        readonly red: string;
        readonly yellow: string;
        readonly blue: string;
        readonly purple: string;
        readonly reset: string;

        constructor() {
                this.green = "\x1b[32m"      // Green
                this.red = "\x1b[31m"        // Red
                this.yellow = "\x1b[33m"     // Yellow
                this.blue = "\x1b[34m"       // Blue
                this.purple = "\x1b[35m"     // Purple
                this.reset = "\x1b[0m"       // Reset color
        }

        getTime(currentDate: Dayjs) {
                return dayjs(currentDate).format("YYYY-MM-DD HH-mm-ss")
        }
        raw(message: string): void { };
        info(message: string): void { };
        test(project: string, message: string): void { };
        warn(message: string): void { };
        debug(message: string): void { };
        success(project: string, message: string): void { };
        error(project: string, message: string): void { };
}


export class MultiLineLogger extends Logger {
        constructor() {
                super()
        }

        raw(message: string): void {
                process.stdout.write(`${this.getTime(dayjs())} ${message}\n`)
        }
        info(message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.blue} [INFO]: ${this.reset}${message}\n`)
        }
        test(project: string, message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.blue} [TEST]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
        }
        warn(message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.yellow} [WARN]: ${this.reset}${message}\n`)
        }
        debug(message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.yellow} [DEBUG]: ${this.reset}${message}\n`)
        }
        success(project: string, message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.green} [PASS]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
        }
        error(project: string, message: string): void {
                process.stdout.write(`${this.getTime(dayjs())}${this.red} [FAIL]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
        }
}

export class SingleLineLogger extends Logger {
        constructor() {
                super()
        }

        raw(message: string): void {
                process.stdout.write(`${this.getTime(dayjs())} ${message}\n\n`)
        }
        info(message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.blue} [INFO]: ${this.reset}${message}\n`)
        }
        test(project: string, message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.blue} [TEST]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
        }
        warn(message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.yellow} [WARN]: ${this.reset}${message}\n`)
        }
        debug(message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.yellow} [DEBUG]: ${this.reset}${message}\n`)
        }
        success(project: string, message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.green} [PASS]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)

        }
        error(project: string, message: string): void {
                process.stdout.moveCursor(0, -1)
                process.stdout.clearLine(0)
                process.stdout.cursorTo(0)
                process.stdout.write(`${this.getTime(dayjs())}${this.red} [FAIL]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
        }
}

export default class LoggerFactory {
        public static createLogger(type: string): Logger {
                if (type === "single") {
                        return new SingleLineLogger()
                } else {
                        return new MultiLineLogger()
                }
        }
}
