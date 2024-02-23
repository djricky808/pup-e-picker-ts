// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { ActiveTabs, Dog } from "../types";
import { ReactNode } from "react";

type FSectionTypes = {
  children: ReactNode;
  activeTab: ActiveTabs | null;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  handleTabClick: (tab: ActiveTabs) => void;
};

export const FunctionalSection = ({
  children,
  activeTab,
  favoritedDogs,
  unfavoritedDogs,
  handleTabClick,
}: FSectionTypes) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              handleTabClick(`favorited`);
            }}
          >
            favorited ({favoritedDogs.length})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleTabClick(`unfavorited`);
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "create dog" ? "active" : ""}`}
            onClick={() => {
              handleTabClick(`create dog`);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
