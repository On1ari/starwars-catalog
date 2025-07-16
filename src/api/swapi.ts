import type { Character, CharacterResponse } from "@/types/types";

const BASE_URL = 'https://www.swapi.tech/api/people';
const LIMIT = 12;

const parseCharacter = (data: any): Character => ({
  ...data.properties,
  uid: data.uid,
  url: data.url,
});

const fetchJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
};

export const fetchCharacter = async (page: number, search?: string): Promise<CharacterResponse> => {
  const url = search?.trim()
    ? `${BASE_URL}/?name=${encodeURIComponent(search.trim())}`
    : `${BASE_URL}/?page=${page}&limit=${LIMIT}`;

  const data = await fetchJson(url);

  // If search returns `result` instead of `results`
  if (Array.isArray(data.result)) {
    const characters = data.result.map(parseCharacter);
    return { results: characters, next: null, previous: null };
  }

  if (Array.isArray(data.results)) {
    const detailedResults = await Promise.all(
      data.results.map(async (item: { url: string; uid: string }) => {
        const detailData = await fetchJson(item.url);
        return parseCharacter(detailData.result);
      })
    );

    return {
      results: detailedResults,
      next: data.next,
      previous: data.previous,
    };
  }

  return { results: [], next: null, previous: null };
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const data = await fetchJson(`${BASE_URL}/${id}`);
  return parseCharacter(data.result);
};
