// string.length 不过这个是有问题的，如果传了 T 就GG
type MyStringLength<
  S extends string,
  T extends any[] = []
> = S extends `${infer R}${infer Rest}`
  ? MyStringLength<Rest, [...T, R]>
  : T['length'];

type ms1 = MyStringLength<'1', [1, 2, 3]>;
type ms2 = MyStringLength<''>;
type ms3 = MyStringLength<'1 2 3'>;

// StringToArray
type MyStringToArray<
  S extends string,
  T extends any[] = []
> = S extends `${infer L}${infer R}` ? MyStringToArray<R, [...T, L]> : T;

type msta1 = MyStringToArray<'1234'>;

// StringToUnion
type MyStringToUnion<S extends string> = S extends `${infer L}${infer R}`
  ? L | MyStringToUnion<R>
  : never;

type mstu1 = MyStringToUnion<'123'>;

// trim

type MySpace = ' ' | '\n' | '\t';
type MyTrimLeft<S extends string> = S extends `${MySpace}${infer R}`
  ? MyTrimLeft<R>
  : S;
type MyTrimRight<S extends string> = S extends `${infer L}${MySpace}`
  ? MyTrimRight<L>
  : S;
type MyTrim<S extends string> = S extends
  | `${infer Rest}${MySpace}`
  | `${MySpace}${infer Rest}`
  ? MyTrim<Rest>
  : S;

type mtl1 = MyTrimLeft<'   123'>;
type mtr1 = MyTrimRight<'123  '>;
type mt1 = MyTrim<'    123    '>;

// Capitalize
type MyCapitalize<S extends string> = S extends `${infer L}${infer R}`
  ? `${Uppercase<L>}${R}`
  : S;

type mc1 = MyCapitalize<'abc'>;
