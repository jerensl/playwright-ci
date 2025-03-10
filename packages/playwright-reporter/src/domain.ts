export interface ITestPlan {
    Passed: number
    Fail: number
    Flaky: number
    Skip: number

    Evaluate(status: "passed" | "failed" | "timedOut" | "skipped" | "interrupted"): void
}

class TestPlan implements ITestPlan {
    private passed: number
    private fail: number
    private flaky: number
    private skip: number

    constructor() {
        this.passed = 0;
        this.fail = 0;
        this.flaky = 0;
        this.skip = 0;
    }

    public get Passed() {
        return this.passed
    }

    public get Fail() {
        return this.fail
    }

    public get Flaky() {
        return this.flaky
    }

    public get Skip() {
        return this.skip
    }

    Evaluate(status: "passed" | "failed" | "timedOut" | "skipped" | "interrupted"): void {
        switch (status) {
            case "passed": {
                this.passed++
                break;
            }
            case "failed": {
                this.fail++
                break;
            }
            case "skipped": {
                this.skip++
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default TestPlan
