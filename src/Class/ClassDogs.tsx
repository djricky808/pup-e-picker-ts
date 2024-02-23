import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { ActiveTabs, Dog } from "../types";

type CDogCardsLayout = {
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
export class ClassDogs extends Component<CDogCardsLayout> {
  componentDidMount(): void {
    this.props.refetchData();
  }

  render() {
    const { allDogs, deleteDog, favoriteHandler, isLoading, activeTab } =
      this.props;

    const filteredDogs = allDogs.filter((dog) => {
      if (activeTab === "favorited") {
        return dog.isFavorite;
      } else if (activeTab === "unfavorited") {
        return !dog.isFavorite;
      } else {
        return dog;
      }
    });

    return (
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              favoriteHandler({ dog, newStatus: false });
            }}
            onEmptyHeartClick={() => {
              favoriteHandler({ dog, newStatus: true });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
