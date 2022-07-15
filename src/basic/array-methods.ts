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

// pop 这里返回的是剩余的数组类型，而不是跟 js 一样，返回被删除的值。
// 因为 ts 类型不能操作内存，拿不到剩余数组，而 js 可以通过操作内存来拿到剩余数组，所以 js 返回的是值，js 和 ts 还是要做区分的
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never;
type mpo1 = MyPop<[1, 2, 3]>;

// pop 扩展1，解决空数组问题
type MyPop2<T extends any[]> = T extends []
  ? []
  : T extends [...infer L, infer R]
  ? L
  : never;
type mpop2 = MyPop2<[]>;
type mpop3 = MyPop2<[1, 2, 3]>;

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

// includes 扩展，支持对象对比
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
type MyIncludes2<T extends any[], U> = T extends [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? true
    : MyIncludes2<Rest, U>
  : false;

type mi3 = MyIncludes2<[{ id: 1 }], { id: 1 }>;
type mi4 = MyIncludes2<[{ id: 1 }], { id: 2 }>;
type mi5 = MyIncludes2<[{ id: 1 }], {}>;

// Flatten
type MyFlat<T extends any[]> = T extends [infer L, ...infer Rest]
  ? L extends any[]
    ? [...MyFlat<L>, ...MyFlat<Rest>]
    : [L, ...MyFlat<Rest>]
  : [];
type mf1 = MyFlat<[1, [2, [3, [4]]]]>;

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

type MyLookUp<T extends { type: string }, K extends string> = T extends {
  type: K;
}
  ? T
  : never;

type MyDogType = MyLookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
