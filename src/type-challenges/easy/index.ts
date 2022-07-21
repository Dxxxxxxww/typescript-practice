type People = {
  name: string;
  age?: number;
  readonly address?: string;
  job: {
    name: string;
    salary: number;
  };
};

// readonly
type TCReadOnly<T, K extends keyof T = keyof T> = {
  readonly [U in K]: T[U];
} & {
  [S in Exclude<keyof T, K>]: T[S];
};
type tcp1 = TCReadOnly<People, 'name' | 'age'>;

// TupleToObject
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
type TCTupleToObject<T extends any[]> = {
  [P in T[number]]: P;
};
type tctto1 = TCTupleToObject<typeof tuple>;

// FirstOfArray
type TCFirstOfArray<T extends any[]> = T extends [infer L, ...R] ? L : never;

type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tcfoa1 = TCFirstOfArray<arr1>; // expected to be 'a'
type tcfoa2 = TCFirstOfArray<arr2>; // expected to be 3

// LastOfArray
type TCLastOfArray<T extends any[]> = T extends [...L, infer R] ? R : never;

type tcloa1 = TCLastOfArray<arr1>; // expected to be 'a'
type tcloa2 = TCLastOfArray<arr2>; // expected to be 3

// Length of Tuple
type TCLengthOfTuple<T extends readonly any[]> = T['length'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
];
type tcot1 = TCLengthOfTuple<spaceX>;

// Exclude
type TCExclude<T, K> = T extends K ? never : T;

type tcexc1 = TCExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

// Await
type TCAwait<T> = T extends Promise<infer U> ? U : never;

type tca1 = TCAwait<Promise<string>>;

type tca2 = TCAwait<Promise<string> | Promise<number>>;

type TCAwait2<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? TCAwait2<U>
    : U
  : never;

type tca3 = TCAwait2<Promise<string> | Promise<number>>;

type tca4 = TCAwait2<Promise<Promise<number>>>;
