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

// push
type MyPush<T extends any[], U> = [...T, U];
type mp1 = MyPush<[1, 2, 3], 4>;

// pop
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never;
type mpo1 = MyPop<[1, 2, 3]>;

// unshift
type MyUnshift<T extends any[], U> = [U, ...T];
type mus = MyUnshift<[1, 2, 3], 4>;

// shift
type MyShift<T extends any[]> = T extends [infer L, ...infer R] ? R : never;
type ms1 = MyShift<[1, 2, 3]>;

// includes 通过 number 来表示下标，获取 T 的所有 value 作为字面量联合类型
type MyIncludes<T extends any[], U> = U extends T[number] ? true : false;
type mi1 = MyIncludes<[1, 2, 3], 4>;
type mi2 = MyIncludes<[1, 2, 3], 2>;
