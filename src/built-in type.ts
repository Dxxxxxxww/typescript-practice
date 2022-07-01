// Readonly

type User = {
  name: string;
  age?: number;
  readonly address?: string;
};

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type r1 = Readonly<User>;
type mr1 = Readonly<User>;

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
type mpt1 = MyPromiseType<Promise<number>>;
