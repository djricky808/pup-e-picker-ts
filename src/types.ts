// Add your own custom types in here
import { ReactNode } from "react";

export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};

export type SectionTypes = {
  children: ReactNode;
  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void;
  getFavoritedDogs: Dog[];
  getUnfavoritedDogs: Dog[];
  handleTabClick: (tab: string) => void;
};

export type DogCardsLayout = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  refetchData: () => void;
  getFavoritedDogs: Dog[];
  getUnfavoritedDogs: Dog[];
  activeTab: string | null;
};
