import { createVitest, parseCLI } from "vitest/node";

export interface DevQAPipelineOptions {
  /** whether to run the test pipeline in CI mode */
  ci?: boolean;

  /** limit/filter with -t */
  only?: string;
}

/** helper lib to run an astro dev server and vitest using programmatic API */
export const runDevQAPipeline = async (
  pipelineOptions: DevQAPipelineOptions,
) => {
  // CI test, one after another, with isolation, with coverage
  const { filter, options } = parseCLI(
    `vitest run ${pipelineOptions.only === "unit" ? "--coverage" : ""}${" "}${
      pipelineOptions.ci ? "--runInBand --watch=false" : "--watch"
    }${" "}${pipelineOptions.only ? `-t ${pipelineOptions.only}` : ""}`,
  );

  const vitest = await createVitest("test", {
    ...options,
    disableConsoleIntercept: true,
  });

  console.log("Running tests...");
  await vitest.start(filter);

  console.log("Continue running...");
};
