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
