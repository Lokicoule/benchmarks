export function promisify<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    resolve(value);
  });
}
