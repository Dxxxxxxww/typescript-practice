// Readonly

type User = {
  name: string;
  age?: number;
  readonly address?: string;
  job: {
    name: string;
    salary: number;
  };
};

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type r1 = Readonly<User>;
type mr1 = MyReadonly<User>;

// MyReadonly 扩展1，支持传参
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
};

type mr2 = MyReadonly2<User, 'name' | 'age'>;

// MyReadonly 扩展2，支持深层

type MyReadonly3<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any }
    ? MyReadonly3<T[P]>
    : T[P];
};

type mr3 = MyReadonly3<User>;

// MyReadonly 扩展3，按需但是保留原来的，应该是要这样的，因为只是按需 readonly，不能把原来的键给扔了

type MyReadonly4<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]: T[P];
};

type mr4 = MyReadonly4<User, 'name' | 'age'>;

// Required

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type r2 = Required<User>;
type mr2 = MyRequired<User>;

// Partial

type MyPartial<T> = {
  [P in keyof T]?: T[P];
  // [P in keyof T]+?: T[P];
};

type r3 = Partial<User>;
type mr3 = MyPartial<User>;

// cancel readonly

type MyCancelReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type mr4 = MyCancelReadonly<User>;

// Pick

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type r5 = Pick<User, 'name' | 'age'>;
type mr5 = MyPick<User, 'name' | 'age'>;

// & 交叉 Record

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type r6 = User & Record<'sex' | 'order', boolean>;
type mr6 = User & Record<'sex' | 'order', boolean>;
let objR6: r6;
let objMr6: mr6;
// objR6.  // name  age  address  sex order
// objMr6. // name  age  address  sex order

// ReturnType
type MyReturnType<F extends (...args: any[]) => any> = F extends (
  ...args: any[]
) => infer R
  ? R
  : never;
// type MyReturnType<T extends (...args: any[]) => any> = T extends (
//   ...args: any[]
// ) => infer R
//   ? R
//   : any;
// type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const add = (a: number): number => a + 1;

type UserInfo = {
  name: string;
  age: number;
};

function login(username: string, password: string): UserInfo {
  const userInfo = { name: 'admin', age: 99 };
  return userInfo;
}

type mrt1 = MyReturnType<login>;
type mrt2 = MyReturnType<add>;

// Params
type MyParams<T> = T extends (...args: infer R) => any ? R : never;
type mp1 = MyParams<add>;

// PromiseType
type MyPromiseType<T> = T extends Promise<infer R> ? R : never;
type mpt1 = MyPromiseType<Promise<number | string>>;

// PromiseType 扩展1，支持嵌套
type MyPromiseType2<T> = T extends Promise<infer R>
  ? R extends Promise<any>
    ? MyPromiseType2<R>
    : R
  : never;

type mpt2 = MyPromiseType2<Promise<string> | Promise<number>>;

type MyAppendArgument<T extends (...args: any[]) => any, K> = T extends (
  ...args: infer U
) => infer R
  ? (...args: [...U, K]) => R
  : never;

type maa1 = MyAppendArgument<(a: number) => number, string>;
