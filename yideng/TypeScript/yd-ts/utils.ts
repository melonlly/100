function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}

export { tuplify };
