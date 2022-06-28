// first
type MyFirst<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never;
type mf1 = MyFirst<[1, 2, 3]>;
// last
type MyLast<T extends any[]> = T extends [...infer Rest, infer L] ? L : never;
type ml1 = MyLast<[1, 2, 3]>;
// concat
type MyConcat<T extends any[], U extends any[] = []> = [...T, ...U];
type mc1 = MyConcat<[1, 2, 3], [4, 5, 6]>;
type mc2 = MyConcat<[1, 2, 3]>;
