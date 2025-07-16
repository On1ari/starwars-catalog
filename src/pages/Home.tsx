import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "@/api/swapi";
import CharacterCard from "@/components/CharacterCard";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CardsPagination from "@/components/CardsPagination";
import SelectGender from "@/components/SelectGender";
import type { Character } from "@/types/types";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | string>("all");
  const debouncedSearch = useDebounce(search, 300);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["people", page, debouncedSearch],
    queryFn: () => fetchCharacter(page, debouncedSearch),
  });

  // Фильтрация результатов мемоизирована для оптимизации рендера
  const filteredResults = useMemo(() => {
    if (!data) return [];
    if (genderFilter === "all") return data.results;
    return data.results.filter((character: Character) => character.gender === genderFilter);
  }, [data, genderFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-center text-red-600">Error fetching data</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <SelectGender value={genderFilter} onChange={setGenderFilter} />
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">No characters found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredResults.map((person: Character) => (
            <CharacterCard key={person.uid} character={person} />
          ))}
        </div>
      )}

      <CardsPagination page={page} setPage={setPage} data={data} />
    </div>
  );
};
