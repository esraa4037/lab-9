import React from "react";
import Carousel from "../carousel/Carousel";
import { useHistory } from "react-router-dom";

export default function Home(props) {
  let history = useHistory();
  // console.log(props);
  const goToElectronics = () => {
    // props.history.push("/electronics");
    history.push("/electronics");
  };
  const goToAllProducts = () => {
    // props.history.push("/allProducts");
    history.push("/allProducts");
  };

  return (
    <div>
      {/*<Carousel />*/}
      <div className="container mt-5 mx-auto text-center">
        <button className="btn btn-primary" onClick={goToAllProducts}>
          Go to All Products
        </button>
        <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
        <button className="btn btn-primary" onClick={goToElectronics}>
          Go to Electronics
        </button>
      </div>
    </div>
  );
}
