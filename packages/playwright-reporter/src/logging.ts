import dayjs, { Dayjs } from "dayjs"

export abstract class Logger {
    readonly green: string;
    readonly red: string;
    readonly yellow: string;
    readonly blue: string;
    readonly purple: string;
    readonly cyan: string;
    readonly reset: string;

    constructor() {
        this.green = "\x1b[32m"
        this.red = "\x1b[31m"
        this.yellow = "\x1b[33m"
        this.blue = "\x1b[34m"
        this.purple = "\x1b[35m"
        this.cyan = "\x1b[36m"
        this.reset = "\x1b[0m"
    }

    getCurrentTime(currentDate: Dayjs) {
        return `${this.cyan}${dayjs(currentDate).format("YYYY-MM-DD HH-mm-ss")}${this.reset}`
    }
    formatTime(time: number) {
        return `${this.cyan}${time}${this.reset}`
    }
    formatError(time: string) {
        return `${this.red}${time}${this.reset}`
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
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${message}\n`)
    }
    info(message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.blue} [INFO]: ${this.reset}${message}\n`)
    }
    test(project: string, message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.blue} [TEST]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
    }
    warn(message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.yellow} [WARN]: ${this.reset}${message}\n`)
    }
    debug(message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.yellow} [DEBUG]: ${this.reset}${message}\n`)
    }
    success(project: string, message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.green} [PASS]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
    }
    error(project: string, message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())}${this.red} [FAIL]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
    }
}

export class SingleLineLogger extends Logger {
    constructor() {
        super()
    }

    raw(message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${message}\n\n`)
    }
    info(message: string): void {
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.blue}[INFO]: ${this.reset}${message}\n\n`)
    }
    test(project: string, message: string): void {
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.blue}[TEST]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n`)
    }
    warn(message: string): void {
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.yellow}[WARN]:${this.reset} ${message}\n`)
    }
    debug(message: string): void {
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.yellow}[DEBUG]:${this.reset} ${message}\n`)
    }
    success(project: string, message: string): void {
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.green}[PASS]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n\n`)

    }
    error(project: string, message: string): void {
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`${this.getCurrentTime(dayjs())} ${this.red}[FAIL]:${this.reset} ${this.purple}[${project}]${this.reset} ${message}\n\n`)
    }
}

export default class LoggerFactory {
    public static createLogger(type: string): Logger {
        if (type === "singleline") {
            return new SingleLineLogger()
        } else {
            return new MultiLineLogger()
        }
    }
}
