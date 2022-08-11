// LookUp
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type TCLookUp<T extends { type: string }, K extends string> = T extends {
  type: K;
}
  ? T
  : never;

type MyDogType = TCLookUp<Cat | Dog, 'dog'>;

// Get Return Type
type TCReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = TCReturnType<typeof fn>;

// Omit 实际上就是 Exclude 更进一步，获取排除后的字段，通过 Pick 组成一个类型。
type TCOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type tcom1 = TCOmit<Todo, 'description' | 'title'>;

type MyExclude<T, U> = T extends U ? never : T;

type tcom2 = MyExclude<keyof Todo, 'description' | 'title'>;
