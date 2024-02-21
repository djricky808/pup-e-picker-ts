import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

export class ClassCreateDogForm extends Component<{
  isLoading: boolean;
  refetchData: () => Promise<void>;
}> {
  state = {
    dogNameInput: "",
    dogImageInput: "/assets/blue-heeler.png",
    descriptionInput: "",
    isLoading: false,
  };

  componentDidUpdate(prevProps: { isLoading: boolean }) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  render() {
    const { dogNameInput, dogImageInput, descriptionInput, isLoading } =
      this.state;
    const { refetchData } = this.props;
    const createDog = (dog: Omit<Dog, "id">) => {
      this.setState({ isLoading: true });
      Requests.postDog(dog)
        .then(() => {
          refetchData();
        })
        .then(() => {
          toast.success("Dog Created");
        })
        .finally(() => this.setState({ isLoading: false }));
    };
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
          this.setState({
            dogNameInput: "",
            descriptionInput: "",
          });
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
            this.setState({ dogNameInput: e.target.value });
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
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={dogImageInput}
          onChange={(e) => {
            this.setState({ dogImageInput: e.target.value });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
