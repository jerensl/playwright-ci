import type { Suite } from "@playwright/test/reporter";

export interface IUtility {
  countUniqueSuites(suite: Suite): number;
  countUniqueTests(suite: Suite): number;
  getProjectName(suite: Suite | undefined): string;
}

class Utility implements IUtility {
  countUniqueSuites(suite: Suite) {
    const uniqueSuiteKeys = new Set();

    function traverse(currentSuite: Suite) {
      for (const child of currentSuite.suites) {
        if (child.title) {
          const key = `${child.location?.file || "unknown"}|${child.title}`;
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
      const key = `${test.location.file}|${test.title}`;
      uniqueTestKeys.add(key);
    }
    return uniqueTestKeys.size;
  }

  getProjectName(suite: Suite | undefined): string {
    if (suite?.type !== "project") {
      return this.getProjectName(suite?.parent);
    }
    return suite?.title ?? "";
  }
}

export default Utility;
