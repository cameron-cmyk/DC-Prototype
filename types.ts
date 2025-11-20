
export type WordLocation = 'pool' | 'indicator' | 'wordplay' | 'definition';

export interface Word {
  id: number;
  text: string;
}

export interface PlacedWord extends Word {
  location: WordLocation;
}

export interface ClueData {
  clue: string;
  answer: string;
  numberOfLetters: number;
  indicator: string[];
  wordplay: string[];
  definition: string[];
}

export interface Clues {
  [key: string]: ClueData;
  Easy: ClueData;
  Medium: ClueData;
  Hard: ClueData;
}

export interface Dictionary {
  [word: string]: {
    uses: {
      [use: string]: string;
    };
  };
}
