import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchData = () => {
    return Requests.getAllDogs().then((dogs) => setAllDogs(dogs));
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog)
      .then(() => {
        refetchData();
      })
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection />
      <FunctionalDogs
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        allDogs={allDogs}
        refetchData={refetchData}
      />
      <FunctionalCreateDogForm
        createDog={createDog}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
