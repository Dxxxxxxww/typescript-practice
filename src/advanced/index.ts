// 交集 分布式条件类型：extends 左右两边都是泛型时，就会逐个迭代进行类型判断
type MyExtract<T, U> = T extends U ? T : never;
// index: 0 name        extends 'age' | 'sex'   => never
// index: 1 age         extends 'age' | 'sex'   => age
// index: 2 address     extends 'age' | 'sex'   => never
// 得到结果 never | age | never
// 联合类型中如果有 never，则会去除 never，因为 never 表示不返回任何类型
type mext1 = MyExtract<'name' | 'age' | 'address', 'age' | 'sex'>;

// 排除，判断 T 是否在 U 中，如果在则排除。分布式条件判断
type MyExclude<T, U> = T extends U ? never : T;

type me1 = MyExclude<'name' | 'age' | 'address', 'age' | 'sex' | 'address'>;

// as 新用法 隐藏下划线开头的属性
// 这里的 as 可以理解为迭代循环中的 if 条件判断。可以理解为进一步类型断言。
type ForIn<T> = {
  [P in keyof T as P extends `_${infer Char}` ? never : P]: T[P];
};
// index: 0 _id，     extends `_${infer Char}`    => never
// index: 1 name，    extends `_${infer Char}`    => name
// index: 2 age，     extends `_${infer Char}`    => age
// never | name | age
type User2 = {
  _id: number;
  name: string;
  age: number;
};

type mfiu = ForIn<User2>;

// isUnion 是否是联合类型，这里使用 extends 是为了使用分布式条件类型
type MyIsUnion<T, U = T> = T extends U
  ? [MyExclude<U, T>] extends [never]
    ? false
    : true
  : never;

type miu1 = MyIsUnion<'a' | 'b' | 'c'>;

// MyPermutation 排列组合 分布式条件类型
type MyPermutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...MyPermutation<MyExclude<U, T>>]
  : never;

type mpmtt1 = MyPermutation<'A' | 'B' | 'C'>;

// AppendToObject，方法1，迭代
type MyAppendToObject1<T, K extends string, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V;
};

type mato1 = MyAppendToObject1<User2, 'address', string>;

// AppendToObject，方法2，交集 &
type MyAppendToObject2<T, K extends string, V> = T & {
  [P in K]: V;
};
type mato2 = MyAppendToObject2<User2, 'address', string>;

// Diff

type User3 = {
  _id: number;
  name: string;
  age: number;
};

type Person = {
  name: string;
  age: number;
  address: string;
  birthday: string;
};

type MyDiff<T, P> = MyExclude<keyof T | keyof P, MyExtract<keyof T, keyof P>>;

type df1 = MyDiff<User3, Person>;
