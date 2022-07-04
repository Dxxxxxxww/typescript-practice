// 交集 分布式条件类型：extends 左右两边都是泛型时，就会逐个迭代进行类型判断

type MyExtract<T, U> = T extends U ? T : never;
// index: 0 name        extends 'age' | 'sex'   => never
// index: 1 age         extends 'age' | 'sex'   => age
// index: 2 address     extends 'age' | 'sex'   => never
// 得到结果 never | age | never
// 联合类型中如果有 never，则会去除 never，因为 never 表示不返回任何类型
type res = MyExtract<'name' | 'age' | 'address', 'age' | 'sex'>;

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
