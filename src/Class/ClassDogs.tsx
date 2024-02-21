import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { DogCardsLayout } from "../types";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<Omit<DogCardsLayout, "setIsLoading">> {
  state = {
    filteredDogs: this.props.allDogs,
    isLoading: false,
  };

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(prevProps: { isLoading: boolean }) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  async fetchData(): Promise<void> {
    try {
      await this.props.refetchData();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  async handleDogDelete(dogId: number): Promise<void> {
    try {
      this.setState({ isLoading: true });
      await Requests.deleteDog(dogId);
      await this.props.refetchData();
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async favoriteHandler(dog: Dog): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const newFavoriteStatus = !dog.isFavorite;
      dog.isFavorite = newFavoriteStatus;
      await Requests.updateDog(dog);
      await this.props.refetchData();
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;
    const filteredDogs = (): Dog[] => {
      const { activeTab, favoritedDogs, unfavoritedDogs, allDogs } =
        this.props;
      if (activeTab === "favorited") {
        return favoritedDogs;
      } else if (activeTab === "unfavorited") {
        return unfavoritedDogs;
      } else {
        return allDogs;
      }
    };
    return (
      <>
        {filteredDogs().map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              this.handleDogDelete(dog.id);
            }}
            onHeartClick={() => {
              this.favoriteHandler(dog);
            }}
            onEmptyHeartClick={() => {
              this.favoriteHandler(dog);
            }}
            isLoading={isLoading}
          />
        ))}

      </>
    );
  }
}
