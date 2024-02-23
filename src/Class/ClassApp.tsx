import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { ActiveTabs, Dog } from "../types";
import toast from "react-hot-toast";

export class ClassApp extends Component {
  state = {
    allDogs: [],
    isLoading: false,
    activeTab: null,
  };

  handleTabClick = (tab: ActiveTabs) => {
    this.setState({ activeTab: this.state.activeTab === tab ? null : tab });
  };

  render() {
    const { allDogs, isLoading, activeTab } = this.state;

    const favoritedDogs = allDogs.filter(
      (dogs: Dog) => dogs.isFavorite === true
    );

    const unfavoritedDogs = allDogs.filter(
      (dogs: Dog) => dogs.isFavorite === false
    );

    const refetchData = () => {
      return Requests.getAllDogs()
        .then((dogs) => this.setState({ allDogs: dogs }))
        .catch(() => {
          toast.error("Failed to fetch dogs");
        });
    };

    const createDog = (dog: Omit<Dog, "id">) => {
      this.setState({ isLoading: true });
      return Requests.postDog(dog)
        .then(() => {
          refetchData();
        })
        .then(() => {
          toast.success("Dog Created");
        })
        .finally(() => this.setState({ isLoading: false }));
    };

    const deleteDog = (id: number) => {
      this.setState({ isLoading: true });
      return Requests.deleteDog(id)
        .then(() => refetchData())
        .catch(() => toast.error("Failed to delete dog."))
        .finally(() => this.setState({ isLoading: false }));
    };

    const favoriteHandler = ({
      dog,
      newStatus,
    }: {
      dog: Dog;
      newStatus: boolean;
    }) => {
      this.setState({ isLoading: true });
      dog.isFavorite = newStatus;
      return Requests.updateDog(dog)
        .then(() => refetchData())
        .catch(() => {
          dog.isFavorite = !newStatus;
          toast.error("Failed to update dog");
        })
        .finally(() => this.setState({ isLoading: false }));
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favoritedDogs={favoritedDogs}
          unfavoritedDogs={unfavoritedDogs}
          activeTab={activeTab}
          handleTabClick={this.handleTabClick}
        >
          {/* should be inside of the ClassSection component using react children */}

          {activeTab !== "create dog" ? (
            <ClassDogs
              isLoading={isLoading}
              allDogs={allDogs}
              refetchData={refetchData}
              deleteDog={deleteDog}
              activeTab={activeTab}
              favoriteHandler={favoriteHandler}
            />
          ) : (
            <ClassCreateDogForm isLoading={isLoading} createDog={createDog} />
          )}
        </ClassSection>
      </div>
    );
  }
}
