import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const getFavoritedDogs = allDogs.filter(
    (dogs: Dog) => dogs.isFavorite === true
  );

  const getUnfavoritedDogs = allDogs.filter(
    (dogs: Dog) => dogs.isFavorite === false
  );

  const refetchData = () => {
    return Requests.getAllDogs().then((dogs) => setAllDogs(dogs));
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => {
        refetchData();
      })
      .then(() => {
        toast.success("Dog Created");
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
        setActiveTab={setActiveTab}
        getFavoritedDogs={getFavoritedDogs}
        getUnfavoritedDogs={getUnfavoritedDogs}
      >
        {activeTab !== "create dog" ? (
          <FunctionalDogs
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            allDogs={allDogs}
            refetchData={refetchData}
            getFavoritedDogs={getFavoritedDogs}
            getUnfavoritedDogs={getUnfavoritedDogs}
            activeTab={activeTab}
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
