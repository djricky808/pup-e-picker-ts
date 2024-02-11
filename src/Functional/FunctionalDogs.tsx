import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
//import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  isLoading,
  setIsLoading,
  allDogs,
  refetchData,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  refetchData: () => void;
}) => {
  // const [allDogs, setAllDogs] = useState<Dog[]>([]);
  //const [isFavorite, setIsFavorite] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const refetchData = () => {
  //   return Requests.getAllDogs().then((dogs) => setAllDogs(dogs));
  // };

  const favoriteHandler = (dog: Dog) => {
    setIsLoading(true);
    const newFavoriteStatus = !dog.isFavorite
    dog.isFavorite = newFavoriteStatus
    return Requests.updateDog(dog)
      .then(() => refetchData())
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {allDogs.map((dog) => (
        <DogCard
          dog={dog}
          onHeartClick={() => {
            favoriteHandler(dog);
            // setIsLoading(true);
            // setIsFavorite(false);
            // return Requests.updateDog(dog)
            // .then(()=>{refetchData})
            // .finally(()=> setIsLoading(false))
          }}
          onEmptyHeartClick={() => favoriteHandler(dog)}
          onTrashIconClick={() => {
            setIsLoading(true);
            return Requests.deleteDog(dog.id)
              .then(() => refetchData())
              .finally(() => setIsLoading(false));
          }}
          isLoading={isLoading}
        />
      ))}
      ,
      {/* <DogCard
        dog={{
          id: 1,
          image: dogPictures.BlueHeeler,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Blue Heeler",
        }}
        key={1}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      /> */}
    </>
  );
};
