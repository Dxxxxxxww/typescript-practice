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

type TCLookUp<T extends { type: string }, K extends string> = T extends {
  type: K;
}
  ? T
  : never;

type MyDogType = TCLookUp<Cat | Dog, 'dog'>;
