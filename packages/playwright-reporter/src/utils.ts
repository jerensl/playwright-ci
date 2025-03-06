import type { Suite } from "@playwright/test/reporter"

export interface IUtility {
  countUniqueSuites(suite: Suite): number
  countUniqueTests(suite: Suite): number
  getProjectName(suite: Suite | undefined): string
}

class Utility implements IUtility {
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

}

export default Utility
