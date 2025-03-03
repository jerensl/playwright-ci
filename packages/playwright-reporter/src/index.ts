import type {
        FullConfig, FullResult, Reporter, Suite, TestCase, TestResult, FullProject
} from '@playwright/test/reporter';
import LoggerFactory, { Logger } from "./logging"

class MyReporter implements Reporter {
        readonly logger: Logger

        constructor() {
                this.logger = LoggerFactory.createLogger("multiline")
        }

        countUniqueSuites(suite: Suite) {
                const uniqueSuiteKeys = new Set();

                // Recursively traverse child suites.
                function traverse(currentSuite: Suite) {
                        for (const child of currentSuite.suites) {
                                // Only count suites with a title (ignores the implicit root suite).
                                if (child.title) {
                                        // Create a unique key combining file path (if available) and suite title.
                                        const key = `${child.location?.file || 'unknown'}|${child.title}`;
                                        uniqueSuiteKeys.add(key);
                                }
                                traverse(child);
                        }
                }
                traverse(suite);
                return uniqueSuiteKeys.size - 1;
        }

        countUniqueTests(suite: Suite) {
                const allTests = suite.allTests();
                const uniqueTestKeys = new Set();

                for (const test of allTests) {
                        // Create a unique key combining the test's file and title.
                        // Adjust this key if you need more granularity.
                        const key = `${test.location.file}|${test.title}`;
                        uniqueTestKeys.add(key);
                }
                return uniqueTestKeys.size;
        }

        getProjectName(suite: Suite | undefined): string {
                if (suite?.type !== "project") {
                        return this.getProjectName(suite?.parent)
                }
                return suite?.title ?? ""
        }

        onBegin(config: FullConfig, suite: Suite) {
                this.logger.info(`Starting test run with ${this.countUniqueSuites(suite)} suite(s) and ${this.countUniqueTests(suite)} test(s).`)
        }

        onTestBegin(test: TestCase, result: TestResult) {
                this.logger.test(this.getProjectName(test.parent), `Executing test: ${test.title}`);
        }

        onTestEnd(test: TestCase, result: TestResult) {
                if (result.status === "passed") {
                        this.logger.success(this.getProjectName(test.parent), `Successfully completed '${test.title}' within ${result.duration / 1000} seconds.`);
                } else if (result.status === "failed") {
                        this.logger.error(this.getProjectName(test.parent), `Error in '${test.title}': ${result.error}. Execution time: ${result.duration / 1000} seconds.`)
                }
        }

        onEnd(result: FullResult) {
                this.logger.info(`Finished the run: ${result.status}`);
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
