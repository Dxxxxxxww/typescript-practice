// Pick
// U 联合类型迭代
type MyPick<T, U> = U extends keyof T ? T[U] : never;
// in 迭代
type MyPick2<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed' | 'ads'>;
type TodoPreview2 = MyPick2<Todo, 'title' | 'completed' | 'ads'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
