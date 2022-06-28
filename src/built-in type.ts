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
