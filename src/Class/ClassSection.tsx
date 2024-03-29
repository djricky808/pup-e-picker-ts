// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ActiveTabs, Dog } from "../types";
import { ReactNode } from "react";

type CSectionTypes = {
  children: ReactNode;
  activeTab: ActiveTabs | null;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  handleTabClick: (tab: ActiveTabs) => void;
};

export class ClassSection extends Component<CSectionTypes> {
  render() {
    const {
      children,
      activeTab,
      favoritedDogs,
      unfavoritedDogs,
      handleTabClick,
    } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              }`}
              onClick={() => {
                handleTabClick("favorited");
              }}
            >
              favorited ( {favoritedDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => {
                handleTabClick("unfavorited");
              }}
            >
              unfavorited ( {unfavoritedDogs.length} )
            </div>
            <div
              className={`selector ${
                activeTab === "create dog" ? "active" : ""
              }`}
              onClick={() => {
                handleTabClick("create dog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
