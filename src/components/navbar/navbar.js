import React from "react";
import NavLink from "../link/NavLink";

class Navbar extends React.Component {
  constructor() {
    super();
    // console.log("Hello from constructor");
    this.state = {
      navElements: [
        { content: "Home", data: "/home" },
        { content: "All Products", data: "/allProducts" },
        { content: "Electronics", data: "/electronics" },
      ],
    };
  }

  componentDidMount() {
    console.log("Hello from componentDidMount");
  }

  componentWillUnmount() {
    // clean up
    // this function will be excuted when the component is destroyed (toggle to another component)
  }

  render() {
    console.log("Hello from render");
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="/home">
                Hidden brand
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {this.state.navElements.map((element) => (
                  <NavLink
                    className={["nav-item", "nav-link"]}
                    content={element.content}
                    data={element.data}
                  />
                ))}
              </ul>
              {/*<form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-dark btn-outline-light"
                  type="submit"
                >
                  Search
                </button>
                </form>*/}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
