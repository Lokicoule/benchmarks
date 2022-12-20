import { IBenchmark, Benchmark, BenchmarkResult } from "../core/benchmark";

function randomMessage(): string {
  const messages = [
    "success",
    "completed",
    "done",
    "ok",
    "error",
    "invalid",
    "failure",
    "fail",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getSuccessMessageUsingArray(key: string): string {
  const messages = {
    success: "This field is valid",
    completed: "This field is valid",
    done: "This field is valid",
    ok: "This field is valid",
  } as { [key: string]: string };

  return messages[key] || "This field is invalid";
}

function getSuccessMessageUsingSwitch(key: string): string {
  switch (key) {
    case "success":
    case "completed":
    case "done":
    case "ok":
      return "This field is valid";
    default:
      return "This field is invalid";
  }
}

function getSuccessMessageUsingIfStatement(key: string): string {
  if (
    key === "success" ||
    key === "completed" ||
    key === "done" ||
    key === "ok"
  ) {
    return "This field is valid";
  }
  return "This field is invalid";
}

function getSuccessMessageUsingRegex(key: string): string {
  return /success|completed|done|ok/.test(key)
    ? "This field is valid"
    : "This field is invalid";
}

function benchmarkRegex(nbIterations: number): IBenchmark {
  const benchmark = new Benchmark("Regex");
  for (let i = 0; i < nbIterations; i++) {
    const start = performance.now();
    getSuccessMessageUsingRegex(randomMessage());
    const end = performance.now();
    benchmark.addResult(new BenchmarkResult(end - start));
  }
  return benchmark;
}

function benchmarkSwitch(nbIterations: number): IBenchmark {
  const benchmark = new Benchmark("Switch");
  for (let i = 0; i < nbIterations; i++) {
    const start = performance.now();
    getSuccessMessageUsingSwitch(randomMessage());
    const end = performance.now();
    benchmark.addResult(new BenchmarkResult(end - start));
  }
  return benchmark;
}

function benchmarkArray(nbIterations: number): IBenchmark {
  const benchmark = new Benchmark("Array");
  for (let i = 0; i < nbIterations; i++) {
    const start = performance.now();
    getSuccessMessageUsingArray(randomMessage());
    const end = performance.now();
    benchmark.addResult(new BenchmarkResult(end - start));
  }
  return benchmark;
}

function benchmarkIfStatement(nbIterations: number): IBenchmark {
  const benchmark = new Benchmark("If Statement");
  for (let i = 0; i < nbIterations; i++) {
    const start = performance.now();
    getSuccessMessageUsingIfStatement(randomMessage());
    const end = performance.now();
    benchmark.addResult(new BenchmarkResult(end - start));
  }
  return benchmark;
}

function displayResults(benchmark: IBenchmark): void {
  console.group(`${benchmark.name} results`);
  console.log(`average: ${benchmark.getAverage()}ms`);
  console.log(`median: ${benchmark.getMedian()}ms`);
  console.groupEnd();
}

function sortBenchmarks(benchmarks: IBenchmark[]): IBenchmark[] {
  return benchmarks.sort((a, b) => a.compare(b));
}

function displayRatio(benchmark: IBenchmark, reference: IBenchmark): void {
  console.group("Ratio between fastest and slowest benchmarks");
  console.log(
    `${benchmark.name} is ${reference.compare(benchmark)} times faster than ${
      reference.name
    }`
  );
  console.log(
    `${benchmark.name} is ${
      100 - 100 * (benchmark.getAverage() / reference.getAverage())
    }% faster than ${reference.name}`
  );

  console.groupEnd();
}

export function run(nbIterations = 100) {
  const benchmarkRegexResult = benchmarkRegex(nbIterations);
  const benchmarkSwitchResult = benchmarkSwitch(nbIterations);
  const benchmarkArrayResult = benchmarkArray(nbIterations);
  const benchmarkIfStatementResult = benchmarkIfStatement(nbIterations);

  const benchmarks = sortBenchmarks([
    benchmarkRegexResult,
    benchmarkSwitchResult,
    benchmarkArrayResult,
    benchmarkIfStatementResult,
  ]);
  console.group("Benchmarks");
  benchmarks.map(displayResults);
  displayRatio(benchmarks[0], benchmarks[benchmarks.length - 1]);
  console.groupEnd();
}
