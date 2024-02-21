import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
//const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [dogNameInput, setDogNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dogImageInput, setDogImageInput] = useState("/assets/blue-heeler.png");

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: dogNameInput,
          image: dogImageInput,
          description: descriptionInput,
          isFavorite: false,
        });
        setDogImageInput("");
        setDescriptionInput("");
        setDogNameInput("");
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        placeholder="Dog Name"
        value={dogNameInput}
        onChange={(e) => {
          setDogNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        placeholder="Dog Description"
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        disabled={isLoading}
        value={dogImageInput}
        onChange={(e) => {
          setDogImageInput(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
