import { execSync } from "child_process";
import { ESLint } from "eslint";
import { red, yellow, blue, green } from "colors";

const tsPromise = new Promise((resolve) => {
  try {
    execSync("tsc --noemit");
    resolve(true);
  } catch (err: any) {
    const errors = err.stdout.toString();
    console.log(
      red(`TS check failed with ${errors.split("\n").length} errors ${errors}`)
    );
  }
});

const lintPromise = new Promise(async (resolve) => {
  const eslint = new ESLint();

  const results = await eslint.lintFiles([
    "src/components/**/*.{ts,tsx}",
    "src/layouts/**/*.{ts,tsx}",
    // "src/pages/**/*.{ts,tsx}",
  ]);

  const errors = results.filter(({ errorCount }) => !!errorCount);
  const warnings = results.filter(({ warningCount }) => !!warningCount);
  const printResults = (results: ESLint.LintResult[], mode = "error") => {
    results.forEach(({ filePath, messages }) => {
      console.log(blue(filePath));
      messages.forEach(({ ruleId, message, line, suggestions }) => {
        const report = `
                rule: ${ruleId}
                message: ${message}
                at line: ${line}
                `;
        console.log(mode === "error" ? red(report) : yellow(report));

        if (suggestions && suggestions.length) {
          console.log(`   suggestions: `);
          suggestions.forEach(({ desc }) => {
            console.log(green(`    - ${desc}`));
          });
        }
      });
    });
  };
  printResults(warnings, "warnings");
  printResults(errors);
  console.log(
    `ESLint check complete with ${red(
      String(errors.length)
    )} errors and ${yellow(String(warnings.length))} warnings`
  );

  if (errors.length) {
    resolve(false);
  } else {
    resolve(true);
  }
});

Promise.all([tsPromise, lintPromise]).then(([ts, lint]) => {
  console.log("TS check", ts ? "succeeded" : "failed");
  console.log("Linter check", lint ? "succeeded" : "failed");

  if (!ts || !lint) {
    process.exit(1);
  }
});
