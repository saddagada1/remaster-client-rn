export interface Loop {
  id: number;
  name: string;
  key: string;
  type: string;
  start: number;
  end: number;
}

type Finger = [number, number | "x"];
type Barre = { fromString: number; toString: number; fret: number };
export interface Chord {
  fingers: Finger[];

  barres: Barre[];

  position: number;

  title: string;
}
