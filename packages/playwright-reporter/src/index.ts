import type {
        FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
        onBegin(config: FullConfig, suite: Suite) {
                console.log(`Starting the run with ${suite.allTests().length} tests`);
        }

        onTestBegin(test: TestCase, result: TestResult) {
                console.log(`Starting test ${test.title}`);
        }

        onTestEnd(test: TestCase, result: TestResult) {
                console.log(`Finished test ${test.title}: ${result.status}`);
        }

        onEnd(result: FullResult) {
                console.log(`Finished the run: ${result.status}`);
        }

        onStdErr(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
                const text = chunk.toString('utf-8');
                process.stderr.write(text);
        }

        onStdOut(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
                const text = chunk.toString('utf-8');
                process.stdout.write(text);
        }
}

export default MyReporter;
