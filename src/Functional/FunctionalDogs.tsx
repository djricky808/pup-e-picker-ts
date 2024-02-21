import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
//import { dogPictures } from "../dog-pictures";
import { Dog, DogCardsLayout } from "../types";
import { Requests } from "../api";
import { useState } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  isLoading,
  setIsLoading,
  allDogs,
  refetchData,
  favoritedDogs,
  unfavoritedDogs,
  activeTab,
}: DogCardsLayout) => {
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(allDogs);
  useEffect(() => {
    if (activeTab === "favorited") {
      setFilteredDogs(favoritedDogs);
    } else if (activeTab === "unfavorited") {
      setFilteredDogs(unfavoritedDogs);
    } else {
      setFilteredDogs(allDogs);
    }
  }, [activeTab, allDogs, favoritedDogs, unfavoritedDogs]);

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
          key={dog.id}
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
    </>
  );
};
