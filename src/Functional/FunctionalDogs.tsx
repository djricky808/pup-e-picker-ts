import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { ActiveTabs, Dog } from "../types";

type FDogCardsLayout = {
  isLoading: boolean;
  allDogs: Dog[];
  refetchData: () => void;
  activeTab: ActiveTabs | null;
  deleteDog: (id: number) => void;
  favoriteHandler: ({
    dog,
    newStatus,
  }: {
    dog: Dog;
    newStatus: boolean;
  }) => void;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  isLoading,
  allDogs,
  refetchData,
  activeTab,
  deleteDog,
  favoriteHandler,
}: FDogCardsLayout) => {
  const filteredDogs = allDogs.filter((dog) => {
    if (activeTab === "favorited") {
      return dog.isFavorite;
    } else if (activeTab === "unfavorited") {
      return !dog.isFavorite;
    } else {
      return dog;
    }
  });

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
            favoriteHandler({ dog, newStatus: false });
          }}
          onEmptyHeartClick={() => {
            favoriteHandler({ dog, newStatus: true });
          }}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
