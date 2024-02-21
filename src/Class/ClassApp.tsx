import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";

export class ClassApp extends Component {
  state = {
    allDogs: [],
    isLoading: false,
    activeTab: null,
  };

  handleTabClick = (tab: string) => {
    this.setState({ activeTab: this.state.activeTab === tab ? "" : tab });
  };

  render() {
    const { allDogs, isLoading, activeTab } = this.state;

    const refetchData = () => {
      return Requests.getAllDogs().then((dogs) =>
        this.setState({ allDogs: dogs })
      );
    };
    const getFavoritedDogs = allDogs.filter(
      (dogs: Dog) => dogs.isFavorite === true
    );

    const getUnfavoritedDogs = allDogs.filter(
      (dogs: Dog) => dogs.isFavorite === false
    );

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          getFavoritedDogs={getFavoritedDogs}
          getUnfavoritedDogs={getUnfavoritedDogs}
          activeTab={activeTab}
          handleTabClick={this.handleTabClick}
        >
          {/* should be inside of the ClassSection component using react children */}

          {activeTab !== "create dog" ? (
            <ClassDogs
              isLoading={isLoading}
              allDogs={allDogs}
              refetchData={refetchData}
              getFavoritedDogs={getFavoritedDogs}
              getUnfavoritedDogs={getUnfavoritedDogs}
              activeTab={activeTab}
            />
          ) : (
            <ClassCreateDogForm
              isLoading={isLoading}
              refetchData={refetchData}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
