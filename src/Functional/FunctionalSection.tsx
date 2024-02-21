// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { SectionTypes } from "../types";

export const FunctionalSection = ({
  children,
  activeTab,
  setActiveTab,
  getFavoritedDogs,
  getUnfavoritedDogs,
}: Omit<SectionTypes, "handleTabClick">) => {
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
              setActiveTab(`${activeTab === "favorited" ? "" : "favorited"}`);
            }}
          >
            favorited ({getFavoritedDogs.length})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab(
                `${activeTab === "unfavorited" ? "" : "unfavorited"}`
              );
            }}
          >
            unfavorited ( {getUnfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "create dog" ? "active" : ""}`}
            onClick={() => {
              setActiveTab(`${activeTab === "create dog" ? "" : "create dog"}`);
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
