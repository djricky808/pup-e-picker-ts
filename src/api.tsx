import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const dog = {
  name: 'Stoutland',
  image: 'Stoutland.jpg',
  description: 'this is a pokemon',
  isFavorite: true,
  id: 20,
}

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () : Promise<Dog[]> => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json())}
    ,
    // should create a dog in the database from a partial dog object
    // and return a promise with the result
  postDog: (dog : Omit<Dog,'id'>) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
    }).then((response) => response.json());
  }, 

  // should delete a dog from the database
  deleteDog: (id:number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },

  updateDog: (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      body: JSON.stringify(dog),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()); 
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
    Requests.postDog(dog);
  },
};
