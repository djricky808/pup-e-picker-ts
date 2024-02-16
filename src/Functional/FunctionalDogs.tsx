import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
//import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import { useState } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  isLoading,
  setIsLoading,
  allDogs,
  refetchData,
  getFavoritedDogs,
  getUnfavoritedDogs,
  activeTab,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  refetchData: () => void;
  getFavoritedDogs: Dog[];
  getUnfavoritedDogs: Dog[];
  activeTab: string | null;
}) => {
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(allDogs);
  useEffect(()=> {
  if (activeTab === "favorited") {
    setFilteredDogs(getFavoritedDogs);
  } else if (activeTab === "unfavorited") {
    setFilteredDogs(getUnfavoritedDogs);
  } else {
    setFilteredDogs(allDogs);
  }}, [activeTab, allDogs, getFavoritedDogs, getUnfavoritedDogs]);

  const favoriteHandler = (dog: Dog) => {
    setIsLoading(true);
    const newFavoriteStatus = !dog.isFavorite;
    dog.isFavorite = newFavoriteStatus;
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
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          onHeartClick={() => {
            favoriteHandler(dog);
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
