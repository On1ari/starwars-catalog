import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchCharacterById } from "@/api/swapi";
import { useQuery } from "@tanstack/react-query";

export const PersonModalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchCharacterById(id!),
  });

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading person.</p>}
        {data && (
          <div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-2">{data.name}</DialogTitle>
            </DialogHeader>
            <div>
              <p>Gender: {data.gender}</p>
              <p>Birth Year: {data.birth_year}</p>
              <p>Height: {data.height} cm</p>
              <p>Mass: {data.mass} kg</p>
              <p>Eye Color: {data.eye_color}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
