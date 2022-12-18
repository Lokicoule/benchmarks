export class BenchmarkResult {
  constructor(private _time: number) {}

  get time(): number {
    return this._time;
  }
}

export interface IBenchmark {
  name: string;
  results: BenchmarkResult[];
  addResult(result: BenchmarkResult): void;
  getAverage(): number;
  getMedian(): number;
  compare(b: IBenchmark): number;
}

export class Benchmark implements IBenchmark {
  private _results: BenchmarkResult[] = [];

  constructor(private _name: string) {}

  get name(): string {
    return this._name;
  }

  get results(): BenchmarkResult[] {
    return this._results;
  }

  addResult(result: BenchmarkResult): void {
    this._results.push(result);
  }

  getAverage(): number {
    return this._results.reduce((a, b) => a + b.time, 0) / this._results.length;
  }

  getMedian(): number {
    const sorted = this._results.sort((a, b) => a.time - b.time);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1].time + sorted[middle].time) / 2;
    }
    return sorted[middle].time;
  }

  compare(benchmark: IBenchmark): number {
    return this.getAverage() - benchmark.getAverage();
  }
}
