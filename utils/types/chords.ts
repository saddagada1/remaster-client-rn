type Finger = [number, number | "x"];
type Barre = { fromString: number; toString: number; fret: number };
export interface Chord {
  fingers: Finger[];

  barres: Barre[];

  position: number;

  title: string;
}
export type ChordsObject = { [key: string]: [Chord] };
