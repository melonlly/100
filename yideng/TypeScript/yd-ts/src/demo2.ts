let arr: number[] = [1, 2, 2];
let arr2 = new Array<number>(4);

function test() {
  const response: string = '京程一灯';
  const age: number = 30;
  //   const data = ;
  //   return <const>[response, age];
  return tuplify(response, age);
}

const items = test();

const [response] = items;

//utils
function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}

//hooks
function useFetch() {
  return [];
}

function sum() {
  let args: IArguments = arguments;
}
