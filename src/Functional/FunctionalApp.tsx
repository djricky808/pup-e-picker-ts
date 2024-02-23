import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState } from "react";
import { ActiveTabs, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabs | null>(null);

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite === true);

  const unfavoritedDogs = allDogs.filter((dog) => dog.isFavorite === false);

  const refetchData = () => {
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch(() => {
        toast.error("Failed to fetch dogs");
      });
  };

  const handleTabClick = (tab: ActiveTabs) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => {
        refetchData();
      })
      .then(() => {
        toast.success("Dog Created");
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => refetchData())
      .catch(() => toast.error("Could not delete dog."))
      .finally(() => setIsLoading(false));
  };

  const favoriteHandler = ({
    dog,
    newStatus,
  }: {
    dog: Dog;
    newStatus: boolean;
  }) => {
    setIsLoading(true);
    dog.isFavorite = newStatus;
    return Requests.updateDog(dog)
      .then(() => refetchData())
      .catch(() => {
        dog.isFavorite = !newStatus;
        toast.error("Could not update dog.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        favoritedDogs={favoritedDogs}
        unfavoritedDogs={unfavoritedDogs}
      >
        {activeTab !== "create dog" ? (
          <FunctionalDogs
            isLoading={isLoading}
            allDogs={allDogs}
            refetchData={refetchData}
            activeTab={activeTab}
            deleteDog={deleteDog}
            favoriteHandler={favoriteHandler}
          />
        ) : (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
