import { run } from "./benchmarks/regex.benchmark";

const nbIterations = Number(process.argv.slice(2)[0]);

run(isNaN(nbIterations) ? undefined : nbIterations);
