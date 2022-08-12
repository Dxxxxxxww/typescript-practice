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

// Omit 实际上就是 Exclude 更进一步，获取排除后剩下的字段，通过 Pick 组成一个类型。
type TCOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type tcom1 = TCOmit<Todo, 'description' | 'title'>;

type MyExclude<T, U> = T extends U ? never : T;

type tcom2 = MyExclude<keyof Todo, 'description' | 'title'>;

// Readonly
type TCReadonly<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
};

// 优解
type TCReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> &
  Omit<T, K>;

type TCReadonly3<T, P extends keyof T = keyof T> = {
  [K in Exclude<keyof T, P>]: T[K];
} & {
  readonly [K in P]: T[K];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type tcr1 = TCReadonly<Todo, 'title' | 'description'>;
type tcr2 = TCReadonly2<Todo, 'title' | 'description'>;
type tcr3 = TCReadonly3<Todo, 'title' | 'description'>;

// Deep Readonly
type TCDeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any }
    ? TCDeepReadonly<T[P]>
    : T[P];
};

// 优解
type TCDeepReadonly2<T> = {
  readonly [P in keyof T]: T[P] extends Function
    ? T[P]
    : T[P] extends Object
    ? DeepReadonly<T[P]>
    : T[P];
};

type TCDeepReadonly3<T> = {
  readonly [key in keyof T]: keyof T[key] extends never
    ? T[key]
    : DeepReadonly<T[key]>;
};

type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type tcDeepReadonly1 = TCDeepReadonly<X>;
type tcDeepReadonly2 = TCDeepReadonly2<X>;
type tcDeepReadonly3 = TCDeepReadonly3<X>;
