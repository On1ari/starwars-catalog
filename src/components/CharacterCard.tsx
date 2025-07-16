import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Character } from "@/types/types";
import { Link } from "react-router-dom";

interface Props {
  character: Character;
}

const CharacterCard = ({ character }: Props) => {
  return (
    <Link to={`/people/${character.uid}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            {character.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gender: {character.gender}</p>
          <p>Birth year: {character.birth_year}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CharacterCard
