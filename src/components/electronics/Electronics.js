import React from "react";
// useState does the same functionality of this.state (in the calss component)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Electronics() {
  let [authenticated, setAuthenticated] = useState(true);
  let [electronics, setElectronics] = useState([]);
  let [showTitle, setShowTitle] = useState(true);
  let [showPrice, setShowPrice] = useState(true);
  let [showDetails, setShowDetails] = useState(false);

  let toggleDetails = (productId) => {
    // setShowTitle(!showTitle);
    // setShowPrice(!showPrice);
    // setShowDetails(!showDetails);
    let newProducts = electronics.filter((product) => {
      if (product.id == productId) {
        product.isVisible = !product.isVisible;
      }
      return product;
    });
    setElectronics(newProducts);
  };

  useEffect(() => {
    // when the array is empty, the function useEffect behaves like component DidMount
    console.log("inside use effect represents function component didMount");
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((device) => {
        // console.log(device);
        setElectronics(device.data.slice(0, 12));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let nextPage = () => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((device) => {
        // console.log(device);
        setElectronics(device.data.slice(12, 21));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="section-products container grid">
      {/* Conditional Rendering */}

      {authenticated ? (
        <div className="row">
          {electronics.map((device) => (
            <div className="col">
              <div className="card" style={{ width: "15rem" }}>
                <img
                  className="card-img-top"
                  src={device.category.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  {!device.isVisible && (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`allProducts/details/${device.id}`}
                    >
                      <h5 className="card-title">{device.title}</h5>
                    </Link>
                  )}
                  {!device.isVisible && (
                    <p className="price">
                      <strong>$</strong>
                      <span> {device.price}</span>
                    </p>
                  )}
                  {device.isVisible && (
                    <p className="card-text">{device.description}</p>
                  )}
                  <button
                    className="btn-details btn btn-primary"
                    onClick={() => {
                      toggleDetails(device.id);
                    }}
                  >
                    {device.isVisible ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container not-found">
          <p>Products are not available</p>
        </div>
      )}
      <button className="btn btn-primary" onClick={nextPage}>
        Next Page
      </button>
    </div>
  );
}
