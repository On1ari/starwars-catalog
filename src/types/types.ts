export interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  url: string;
  uid: string;
  eye_color: string;
}

export interface CharacterResponse {
  count?: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
