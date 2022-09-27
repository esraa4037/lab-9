import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Carousel from "./components/carousel/Carousel";
import AllProducts from "./components/allProducts/AllProducts";
import Electronics from "./components/electronics/Electronics";
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/allProducts" exact component={AllProducts} />
        <Route path="/allProducts/details/:id" component={Details} />
        <Route path="/electronics" component={Electronics} />
      </Router>
    </div>
  );
}

export default App;
