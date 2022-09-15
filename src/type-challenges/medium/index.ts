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

// Tuple to Union
type TCTupleToUnion<T extends any[]> = T[number];

type tcttu1 = TCTupleToUnion<['1', '2', '3']>;

// Chainable Options 不会写
type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => Chainable<T & Record<K, V>>;
  get: () => T;
};

declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

type Chainable2<T = {}> = {
  option<K extends string, V extends any>(
    key: K,
    value: Exclude<V, K extends keyof T ? T[K] : never>
  ): Chainable2<{
    [k in keyof T | K]: k extends keyof T ? (K extends keyof T ? V : T[k]) : V;
  }>;
  get(): T;
};

declare const config2: Chainable2;
const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// Last of Array
type TCLastOfArray<T extends any[]> = T extends [...infer L, infer R]
  ? R
  : never;

type arr11111 = ['a', 'b', 'c'];
type arr22222 = [3];

type tcoa1 = TCLastOfArray<arr11111>;
type tcoa2 = TCLastOfArray<arr22222>;

// Pop
type TCPop<T extends any[]> = T extends [...infer L, infer R] ? L : never;

type tcpop1 = TCPop<['a', 'b', 'c', 'd']>; // expected to be ['a', 'b', 'c']
type tcpop2 = TCPop<[3, 2, 1]>; // expected to be [3, 2]

// Promise.all 不会写
declare function PromiseAll1<T extends any[]>(
  values: readonly [...T]
): Promise<{ [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k] }>;

type MyAwaited<T> = T extends Promise<infer P> ? P : T;
declare function PromiseAll2<T extends any[]>(
  values: readonly [...T]
): Promise<{ [P in keyof T]: MyAwaited<T[P]> }>;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p1 = PromiseAll1([promise1, promise2, promise3] as const);
const p2 = PromiseAll2([promise1, promise2, promise3] as const);
type tp2 = keyof promise3;

// Replace
type TCReplace<
  S extends string,
  From extends string,
  To extends string
> = S extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : S;

type tcrp1 = TCReplace<'types are fun!', 'fun', 'awesome'>;

// ReplaceAll
type TCReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${TCReplaceAll<R, From, To>}`
  : S;

type tcrpa1 = TCReplaceAll<'t y p e s', ' ', ''>;

// Append Argument
type TCAppendArgument<Fn, A> = Fn extends (...args: infer L) => infer R
  ? (...args: [...L, A]) => R
  : never;

type tcaa1 = TCAppendArgument<(a: number, b: string) => number, boolean>;

// Permutation 不会写
// 思路：具体参考 https://github.com/type-challenges/type-challenges/issues/614，思路很详细
// https://github.com/microsoft/TypeScript/issues/23182   T extends never 写法必须为 [T] extends [never] 可能是 ts 的bug
type TCPermutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...TCPermutation<Exclude<U, T>>]
  : never;

type tcperm1 = TCPermutation<'A' | 'B' | 'C'>;

// String length
type TCStringLength<
  S extends string,
  A extends string[] = []
> = S extends `${infer L}${infer R}`
  ? TCStringLength<R, [...A, L]>
  : A['length'];

type tcsl1 = TCStringLength<'abc'>;

// Flatten
type TCFlatten<T extends any[]> = T extends [infer L, ...infer R]
  ? L extends any[]
    ? [...TCFlatten<L>, ...TCFlatten<R>]
    : [L, ...TCFlatten<R>]
  : T;

type tcfl1 = TCFlatten<[1, 2, [3, 4], [[[5]]]]>;

// Append to object
type TCAppendToObject<O extends Object, K extends String, V extends any> = {
  [P in keyof O | K]: P extends keyof O ? O[P] : V;
};

type TCAppendToObject2<
  O extends Object,
  K extends String,
  V extends any
> = O & {
  [P in K]: V;
};

type TestTCAppendToObject = { id: '1' };
type tcato1 = TCAppendToObject<TestTCAppendToObject, 'value', 4>;
type tcato2 = TCAppendToObject2<TestTCAppendToObject, 'value', 4>;

// Absolute
type TCAbsolute<T extends string | number | bigint> =
  `${T}` extends `-${infer R}` ? `${R}` : `${T}`;

type tcas1 = TCAbsolute<-100>;

// String to Union
type TCStringToUnion<S extends string> = S extends `${infer L}${infer R}`
  ? L | TCStringToUnion<R>
  : never;

type tcstu1 = TCStringToUnion<'123'>;

// Merge
type TCMerge<T, O> = {
  [K in keyof T | keyof O]: K extends keyof O
    ? O[K]
    : K extends keyof T
    ? T[K]
    : never;
};

type tcmerge1 = TCMerge<
  {
    name: string;
    age: string;
  },
  {
    age: number;
    sex: string;
  }
>;

// KebabCase
type TCKebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<L>}${TCKebabCase<R>}`
    : `${Lowercase<L>}-${TCKebabCase<R>}`
  : S;

type tckbbc1 = TCKebabCase<'aBC'>;
type tckbbc2 = TCKebabCase<'a-b-c'>;

// Diff key 不会写--需要加强练习

type TCDiffKey<T, P> = Exclude<keyof T | keyof P, Extract<keyof T, keyof P>>;

type tcdk1 = TCDiffKey<
  {
    _id: number;
    name: string;
    age: number;
  },
  {
    name: string;
    age: number;
    address: string;
    birthday: string;
  }
>;

// Diff Object 不会写--需要加强练习

type TCDiffObj<T, P> = Omit<T & P, Extract<keyof T, keyof P>>;
type TCDiffObj2<T, P> = Omit<T & P, keyof T & keyof P>;

type tcdo1 = TCDiffObj<
  { name: 'name'; age: 10 },
  { age: 10; address: 'earth' }
>;
type tcdo2 = TCDiffObj2<
  { name: 'name'; age: 10 },
  { age: 10; address: 'earth' }
>;

type abc = ('a' | 'b' | 'c') & ('a' | 'b' | 'e');
type def = { name: 'name'; age: 10 } & { age: 10; address: 'earth' };
type zzz = { name: string; age: number } & { age: number; address: string };

// Any Of 不会写
type Falsy = false | 0 | '' | [] | { [k in string]: never };
type TCAnyOf<T extends any[]> = T[number] extends Falsy ? false : true;

type tcanyo1 = TCAnyOf<[1, '', false, [], {}]>; // expected to be true.
type tcanyo2 = TCAnyOf<[0, '', false, [], {}]>; // expected to be false.

// isNever
type TCIsNever<T> = [T] extends [never] ? true : false;

type A = TCIsNever<never>; // expected to be true
type B = TCIsNever<undefined>; // expected to be false
type C = TCIsNever<null>; // expected to be false
type D = TCIsNever<[]>; // expected to be false
type E = TCIsNever<number>; // expected to be false
