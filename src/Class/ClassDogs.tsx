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

  // componentDidUpdate(prevProps: Omit<DogCardsLayout, "setIsLoading">): void {
  //   if (prevProps.activeTab !== this.props.activeTab) {
  //     // this.updateFilteredDogs();
  //   }
  // }

  // updateFilteredDogs = (): void => {
  //   const { activeTab, getFavoritedDogs, getUnfavoritedDogs, allDogs } =
  //     this.props;
  //   if (activeTab === "favorited") {
  //     this.setState({ filteredDogs: getFavoritedDogs });
  //   } else if (activeTab === "unfavorited") {
  //     this.setState({ filteredDogs: getUnfavoritedDogs });
  //   } else {
  //     this.setState({ filteredDogs: allDogs });
  //   }
  // };

  componentDidUpdate(prevProps: { isLoading: boolean }) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  async fetchData(): Promise<void> {
    try {
      await this.props.refetchData();
      // await this.updateFilteredDogs();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  async handleDogDelete(dogId: number): Promise<void> {
    try {
      this.setState({ isLoading: true });
      await Requests.deleteDog(dogId);
      await this.props.refetchData();
      // await this.updateFilteredDogs();
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
      // await this.updateFilteredDogs();
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;
    const filteredDogs = (): Dog[] => {
      const { activeTab, getFavoritedDogs, getUnfavoritedDogs, allDogs } =
        this.props;
      if (activeTab === "favorited") {
        return getFavoritedDogs;
      } else if (activeTab === "unfavorited") {
        return getUnfavoritedDogs;
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
  }
}
