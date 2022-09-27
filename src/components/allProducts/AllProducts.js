import React from "react";
import "./allProducts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllProducts() {
  let [authenticated, setAuthenticated] = useState(true);

  let [allProducts, setAllProducts] = useState([]);
  let [currentProducts, setCurrentProducts] = useState(allProducts.slice(0, 8));
  let [showTitle, setShowTitle] = useState(true);
  let [showPrice, setShowPrice] = useState(true);
  let [showDetails, setShowDetails] = useState(false);

  let toggleDetails = (productId) => {
    let newProducts = allProducts.filter((product) => {
      if (product.id == productId) {
        product.isVisible = !product.isVisible;
      }
      return product;
    });
    setAllProducts(newProducts);
  };

  let nextPage = () => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((products) => {
        // console.log(products);
        setAllProducts(products.data.slice(12, 21));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // when the array is empty, the function useEffect behaves like component DidMount
    console.log("inside use effect represents function component didMount");
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((products) => {
        // console.log(products);
        setAllProducts(products.data.slice(0, 12));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="section-products container grid">
      {/* Conditional Rendering */}

      {authenticated ? (
        <div className="row">
          {allProducts.map((device) => (
            <div className="col">
              <div className="card" style={{ width: "15rem" }}>
                <img
                  className="card-img-top"
                  src={device.category.image}
                  alt="product image"
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

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// export default class AllProducts extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       allProducts: [
//         {
//           id: 1,
//           title: "Small Soft Pants",
//           price: 281,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4951",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=759",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2390",
//           ],
//         },
//         {
//           id: 2,
//           title: "Fantastic Wooden Soap",
//           price: 573,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1432",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4193",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5146",
//           ],
//         },
//         {
//           id: 3,
//           title: "Intelligent Fresh Fish",
//           price: 647,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6546",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3232",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4796",
//           ],
//         },
//         {
//           id: 4,
//           title: "Intelligent Cotton Towels",
//           price: 827,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8463",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3579",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3873",
//           ],
//         },
//         {
//           id: 5,
//           title: "Licensed Frozen Keyboard",
//           price: 716,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=417",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7399",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8399",
//           ],
//         },
//         {
//           id: 6,
//           title: "Refined Cotton Cheese",
//           price: 730,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6584",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6289",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8067",
//           ],
//         },
//         {
//           id: 7,
//           title: "Awesome Metal Ball",
//           price: 995,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=8887",
//             "https://api.lorem.space/image?w=640&h=480&r=9746",
//             "https://api.lorem.space/image?w=640&h=480&r=7073",
//           ],
//         },
//         {
//           id: 8,
//           title: "Fantastic Fresh Sausages",
//           price: 468,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3805",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6517",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2708",
//           ],
//         },
//         {
//           id: 9,
//           title: "Licensed Cotton Tuna",
//           price: 196,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3269",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1996",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8808",
//           ],
//         },
//         {
//           id: 10,
//           title: "Tasty Concrete Shoes",
//           price: 297,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4565",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4816",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8683",
//           ],
//         },
//         {
//           id: 11,
//           title: "Ergonomic Metal Table",
//           price: 203,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=2531",
//             "https://api.lorem.space/image?w=640&h=480&r=4615",
//             "https://api.lorem.space/image?w=640&h=480&r=7547",
//           ],
//         },
//         {
//           id: 12,
//           title: "Fantastic Steel Salad",
//           price: 879,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2442",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8744",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=821",
//           ],
//         },
//         {
//           id: 13,
//           title: "Handcrafted Cotton Computer",
//           price: 971,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9786",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=462",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5132",
//           ],
//         },
//         {
//           id: 14,
//           title: "Refined Soft Soap",
//           price: 756,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6079",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3479",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6046",
//           ],
//         },
//         {
//           id: 15,
//           title: "Refined Fresh Shoes",
//           price: 298,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8021",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5418",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9651",
//           ],
//         },
//         {
//           id: 16,
//           title: "Handcrafted Concrete Shirt",
//           price: 478,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8819",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=155",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8513",
//           ],
//         },
//         {
//           id: 17,
//           title: "Ergonomic Granite Chicken",
//           price: 125,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2279",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2223",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6840",
//           ],
//         },
//         {
//           id: 18,
//           title: "Awesome Frozen Gloves",
//           price: 718,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4122",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9220",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7381",
//           ],
//         },
//         {
//           id: 19,
//           title: "Gorgeous Cotton Mouse",
//           price: 830,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5386",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9217",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=882",
//           ],
//         },
//         {
//           id: 20,
//           title: "Generic Granite Pants",
//           price: 213,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4845",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1846",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6109",
//           ],
//         },
//         {
//           id: 21,
//           title: "Generic Plastic Sausages",
//           price: 38,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4148",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5720",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5895",
//           ],
//         },
//         {
//           id: 22,
//           title: "Intelligent Fresh Tuna",
//           price: 26,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1066",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2765",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7890",
//           ],
//         },
//         {
//           id: 23,
//           title: "Intelligent Concrete Shoes",
//           price: 459,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5240",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5894",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5821",
//           ],
//         },
//         {
//           id: 24,
//           title: "Licensed Plastic Bike",
//           price: 986,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7356",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2346",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7942",
//           ],
//         },
//         {
//           id: 25,
//           title: "Handcrafted Steel Keyboard",
//           price: 704,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=3556",
//             "https://api.lorem.space/image?w=640&h=480&r=1456",
//             "https://api.lorem.space/image?w=640&h=480&r=328",
//           ],
//         },
//         {
//           id: 26,
//           title: "Intelligent Plastic Mouse",
//           price: 912,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5855",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=512",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=839",
//           ],
//         },
//         {
//           id: 27,
//           title: "Unbranded Soft Car",
//           price: 8,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3505",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8985",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=517",
//           ],
//         },
//         {
//           id: 28,
//           title: "Handcrafted Fresh Soap",
//           price: 146,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4609",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1364",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8805",
//           ],
//         },
//         {
//           id: 29,
//           title: "Refined Wooden Soap",
//           price: 253,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=4512",
//             "https://api.lorem.space/image?w=640&h=480&r=1461",
//             "https://api.lorem.space/image?w=640&h=480&r=2307",
//           ],
//         },
//         {
//           id: 30,
//           title: "Refined Concrete Chair",
//           price: 712,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=8821",
//             "https://api.lorem.space/image?w=640&h=480&r=7855",
//             "https://api.lorem.space/image?w=640&h=480&r=8990",
//           ],
//         },
//         {
//           id: 31,
//           title: "Sleek Plastic Keyboard",
//           price: 817,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7156",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9246",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=701",
//           ],
//         },
//         {
//           id: 32,
//           title: "Small Granite Computer",
//           price: 225,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7934",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2303",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5108",
//           ],
//         },
//         {
//           id: 33,
//           title: "Handmade Wooden Chair",
//           price: 417,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9881",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6814",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6257",
//           ],
//         },
//         {
//           id: 34,
//           title: "Fantastic Concrete Chips",
//           price: 505,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8629",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2328",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=188",
//           ],
//         },
//         {
//           id: 35,
//           title: "Handcrafted Wooden Chicken",
//           price: 785,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=3119",
//             "https://api.lorem.space/image?w=640&h=480&r=1882",
//             "https://api.lorem.space/image?w=640&h=480&r=2185",
//           ],
//         },
//         {
//           id: 36,
//           title: "Small Steel Tuna",
//           price: 958,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1517",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5036",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8134",
//           ],
//         },
//         {
//           id: 37,
//           title: "Rustic Wooden Table",
//           price: 361,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=7016",
//             "https://api.lorem.space/image?w=640&h=480&r=336",
//             "https://api.lorem.space/image?w=640&h=480&r=2216",
//           ],
//         },
//         {
//           id: 38,
//           title: "Practical Cotton Towels",
//           price: 830,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1785",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8722",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5711",
//           ],
//         },
//         {
//           id: 39,
//           title: "Gorgeous Fresh Sausages",
//           price: 193,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4774",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6481",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2152",
//           ],
//         },
//         {
//           id: 40,
//           title: "Generic Fresh Mouse",
//           price: 54,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3554",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9308",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8395",
//           ],
//         },
//         {
//           id: 41,
//           title: "Small Plastic Gloves",
//           price: 364,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5829",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4035",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=632",
//           ],
//         },
//         {
//           id: 42,
//           title: "Handmade Frozen Computer",
//           price: 490,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=2700",
//             "https://api.lorem.space/image?w=640&h=480&r=4331",
//             "https://api.lorem.space/image?w=640&h=480&r=5680",
//           ],
//         },
//         {
//           id: 43,
//           title: "Unbranded Soft Soap",
//           price: 497,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3637",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7869",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4084",
//           ],
//         },
//         {
//           id: 44,
//           title: "Sleek Fresh Tuna",
//           price: 107,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3131",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=981",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4512",
//           ],
//         },
//         {
//           id: 45,
//           title: "Tasty Plastic Pants",
//           price: 489,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7614",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1119",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1601",
//           ],
//         },
//         {
//           id: 46,
//           title: "Rustic Rubber Bike",
//           price: 217,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=826",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2316",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9877",
//           ],
//         },
//         {
//           id: 47,
//           title: "Incredible Fresh Chicken",
//           price: 397,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5038",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=133",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4078",
//           ],
//         },
//         {
//           id: 48,
//           title: "Fantastic Soft Hat",
//           price: 685,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6957",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9608",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5650",
//           ],
//         },
//         {
//           id: 49,
//           title: "Ergonomic Plastic Keyboard",
//           price: 611,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6074",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3423",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8850",
//           ],
//         },
//         {
//           id: 50,
//           title: "Handcrafted Soft Bacon",
//           price: 847,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=7305",
//             "https://api.lorem.space/image?w=640&h=480&r=8716",
//             "https://api.lorem.space/image?w=640&h=480&r=8699",
//           ],
//         },
//         {
//           id: 51,
//           title: "Refined Rubber Cheese",
//           price: 660,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7418",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4177",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=399",
//           ],
//         },
//         {
//           id: 52,
//           title: "Intelligent Plastic Ball",
//           price: 398,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1586",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6998",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8014",
//           ],
//         },
//         {
//           id: 53,
//           title: "Handcrafted Granite Gloves",
//           price: 438,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=3629",
//             "https://api.lorem.space/image?w=640&h=480&r=6729",
//             "https://api.lorem.space/image?w=640&h=480&r=9243",
//           ],
//         },
//         {
//           id: 54,
//           title: "Intelligent Soft Mouse",
//           price: 132,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=3193",
//             "https://api.lorem.space/image?w=640&h=480&r=1766",
//             "https://api.lorem.space/image?w=640&h=480&r=2378",
//           ],
//         },
//         {
//           id: 55,
//           title: "Intelligent Fresh Computer",
//           price: 389,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2430",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6379",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9968",
//           ],
//         },
//         {
//           id: 56,
//           title: "Small Frozen Chair",
//           price: 156,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=4327",
//             "https://api.lorem.space/image?w=640&h=480&r=1829",
//             "https://api.lorem.space/image?w=640&h=480&r=8483",
//           ],
//         },
//         {
//           id: 57,
//           title: "Incredible Steel Chips",
//           price: 403,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3570",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6432",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1573",
//           ],
//         },
//         {
//           id: 58,
//           title: "Ergonomic Fresh Chips",
//           price: 705,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=416",
//             "https://api.lorem.space/image?w=640&h=480&r=8948",
//             "https://api.lorem.space/image?w=640&h=480&r=7354",
//           ],
//         },
//         {
//           id: 59,
//           title: "Generic Wooden Soap",
//           price: 183,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6654",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9500",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9664",
//           ],
//         },
//         {
//           id: 60,
//           title: "Practical Rubber Salad",
//           price: 638,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=364",
//             "https://api.lorem.space/image?w=640&h=480&r=7751",
//             "https://api.lorem.space/image?w=640&h=480&r=6759",
//           ],
//         },
//         {
//           id: 61,
//           title: "Incredible Metal Tuna",
//           price: 393,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=416",
//             "https://api.lorem.space/image?w=640&h=480&r=313",
//             "https://api.lorem.space/image?w=640&h=480&r=5648",
//           ],
//         },
//         {
//           id: 62,
//           title: "Awesome Cotton Sausages",
//           price: 106,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=6464",
//             "https://api.lorem.space/image?w=640&h=480&r=7",
//             "https://api.lorem.space/image?w=640&h=480&r=785",
//           ],
//         },
//         {
//           id: 63,
//           title: "Generic Metal Mouse",
//           price: 948,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2407",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3922",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8172",
//           ],
//         },
//         {
//           id: 64,
//           title: "Ergonomic Cotton Soap",
//           price: 743,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7749",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8994",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1427",
//           ],
//         },
//         {
//           id: 65,
//           title: "Unbranded Steel Gloves",
//           price: 12,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1495",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4912",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9112",
//           ],
//         },
//         {
//           id: 66,
//           title: "Practical Cotton Cheese",
//           price: 585,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7421",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7110",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3751",
//           ],
//         },
//         {
//           id: 67,
//           title: "Rustic Soft Pants",
//           price: 36,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6483",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2365",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4898",
//           ],
//         },
//         {
//           id: 68,
//           title: "Fantastic Metal Cheese",
//           price: 731,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8698",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3961",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7086",
//           ],
//         },
//         {
//           id: 69,
//           title: "Rustic Soft Chair",
//           price: 929,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5149",
//             "https://api.lorem.space/image?w=640&h=480&r=7591",
//             "https://api.lorem.space/image?w=640&h=480&r=5622",
//           ],
//         },
//         {
//           id: 70,
//           title: "Tasty Soft Chicken",
//           price: 118,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2091",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3696",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2730",
//           ],
//         },
//         {
//           id: 71,
//           title: "Small Frozen Ball",
//           price: 422,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=7232",
//             "https://api.lorem.space/image?w=640&h=480&r=3890",
//             "https://api.lorem.space/image?w=640&h=480&r=6357",
//           ],
//         },
//         {
//           id: 72,
//           title: "Licensed Cotton Salad",
//           price: 281,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=438",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8709",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8547",
//           ],
//         },
//         {
//           id: 73,
//           title: "Unbranded Concrete Pizza",
//           price: 30,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2869",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=17",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9813",
//           ],
//         },
//         {
//           id: 74,
//           title: "Handmade Cotton Shoes",
//           price: 327,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4962",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3387",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=542",
//           ],
//         },
//         {
//           id: 75,
//           title: "Fantastic Cotton Sausages",
//           price: 417,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=9607",
//             "https://api.lorem.space/image?w=640&h=480&r=6729",
//             "https://api.lorem.space/image?w=640&h=480&r=6989",
//           ],
//         },
//         {
//           id: 76,
//           title: "Sleek Soft Gloves",
//           price: 882,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1550",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8907",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2840",
//           ],
//         },
//         {
//           id: 77,
//           title: "Awesome Cotton Hat",
//           price: 994,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=508",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8066",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=307",
//           ],
//         },
//         {
//           id: 78,
//           title: "Unbranded Cotton Ball",
//           price: 659,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=425",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3908",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8388",
//           ],
//         },
//         {
//           id: 79,
//           title: "Handcrafted Plastic Table",
//           price: 13,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=9710",
//             "https://api.lorem.space/image?w=640&h=480&r=7300",
//             "https://api.lorem.space/image?w=640&h=480&r=9815",
//           ],
//         },
//         {
//           id: 80,
//           title: "Tasty Soft Soap",
//           price: 583,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4595",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4252",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9396",
//           ],
//         },
//         {
//           id: 81,
//           title: "Tasty Fresh Chicken",
//           price: 28,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1190",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3040",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4179",
//           ],
//         },
//         {
//           id: 82,
//           title: "Fantastic Frozen Mouse",
//           price: 384,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5866",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6143",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7914",
//           ],
//         },
//         {
//           id: 83,
//           title: "Handcrafted Granite Cheese",
//           price: 108,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2035",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7864",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2542",
//           ],
//         },
//         {
//           id: 84,
//           title: "Fantastic Concrete Cheese",
//           price: 726,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8938",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5034",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3460",
//           ],
//         },
//         {
//           id: 85,
//           title: "Rustic Concrete Pants",
//           price: 363,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2106",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6073",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6485",
//           ],
//         },
//         {
//           id: 86,
//           title: "Intelligent Steel Chicken",
//           price: 212,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=9553",
//             "https://api.lorem.space/image?w=640&h=480&r=742",
//             "https://api.lorem.space/image?w=640&h=480&r=7062",
//           ],
//         },
//         {
//           id: 87,
//           title: "Licensed Rubber Cheese",
//           price: 148,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7852",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5976",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5039",
//           ],
//         },
//         {
//           id: 88,
//           title: "Tasty Metal Gloves",
//           price: 579,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7657",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9255",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4726",
//           ],
//         },
//         {
//           id: 89,
//           title: "Handcrafted Plastic Computer",
//           price: 330,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4895",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4274",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=433",
//           ],
//         },
//         {
//           id: 90,
//           title: "Generic Rubber Keyboard",
//           price: 349,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7501",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8356",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7688",
//           ],
//         },
//         {
//           id: 91,
//           title: "Intelligent Fresh Keyboard",
//           price: 680,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5768",
//             "https://api.lorem.space/image?w=640&h=480&r=6853",
//             "https://api.lorem.space/image?w=640&h=480&r=8107",
//           ],
//         },
//         {
//           id: 92,
//           title: "Handmade Metal Shoes",
//           price: 839,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6068",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2845",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2620",
//           ],
//         },
//         {
//           id: 93,
//           title: "Practical Granite Chicken",
//           price: 341,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4089",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7514",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6136",
//           ],
//         },
//         {
//           id: 94,
//           title: "Unbranded Steel Cheese",
//           price: 501,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7211",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5107",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8576",
//           ],
//         },
//         {
//           id: 95,
//           title: "Unbranded Frozen Towels",
//           price: 575,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5781",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6593",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2868",
//           ],
//         },
//         {
//           id: 96,
//           title: "Handcrafted Concrete Pizza",
//           price: 618,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2045",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1723",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6613",
//           ],
//         },
//         {
//           id: 97,
//           title: "Unbranded Soft Chips",
//           price: 436,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8951",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6134",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8031",
//           ],
//         },
//         {
//           id: 98,
//           title: "Small Rubber Sausages",
//           price: 914,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1843",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7183",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9760",
//           ],
//         },
//         {
//           id: 99,
//           title: "Generic Plastic Chips",
//           price: 787,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2256",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4140",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8011",
//           ],
//         },
//         {
//           id: 100,
//           title: "Practical Rubber Shoes",
//           price: 32,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6278",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=64",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=471",
//           ],
//         },
//         {
//           id: 101,
//           title: "Fantastic Plastic Hat",
//           price: 731,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4774",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=516",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8110",
//           ],
//         },
//         {
//           id: 102,
//           title: "Practical Fresh Table",
//           price: 344,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3042",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4012",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5365",
//           ],
//         },
//         {
//           id: 103,
//           title: "Sleek Cotton Chips",
//           price: 284,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9754",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2015",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3086",
//           ],
//         },
//         {
//           id: 104,
//           title: "Licensed Plastic Cheese",
//           price: 397,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5005",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6269",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=308",
//           ],
//         },
//         {
//           id: 105,
//           title: "Handcrafted Rubber Car",
//           price: 106,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=454",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2267",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6943",
//           ],
//         },
//         {
//           id: 106,
//           title: "Incredible Fresh Towels",
//           price: 975,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4711",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8757",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3067",
//           ],
//         },
//         {
//           id: 107,
//           title: "Awesome Frozen Cheese",
//           price: 45,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4147",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3453",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3633",
//           ],
//         },
//         {
//           id: 108,
//           title: "Small Concrete Chips",
//           price: 997,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4816",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4373",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2540",
//           ],
//         },
//         {
//           id: 109,
//           title: "Intelligent Steel Chicken",
//           price: 296,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6900",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6196",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=3110",
//           ],
//         },
//         {
//           id: 110,
//           title: "Awesome Concrete Towels",
//           price: 309,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1427",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1889",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5278",
//           ],
//         },
//         {
//           id: 111,
//           title: "Sleek Steel Computer",
//           price: 612,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9312",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1620",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=415",
//           ],
//         },
//         {
//           id: 112,
//           title: "Generic Fresh Gloves",
//           price: 457,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9895",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9283",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1879",
//           ],
//         },
//         {
//           id: 113,
//           title: "Handmade Fresh Bike",
//           price: 604,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=697",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2782",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9841",
//           ],
//         },
//         {
//           id: 114,
//           title: "Generic Steel Hat",
//           price: 145,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3830",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9589",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4851",
//           ],
//         },
//         {
//           id: 115,
//           title: "Refined Fresh Chips",
//           price: 463,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2766",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=120",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1025",
//           ],
//         },
//         {
//           id: 116,
//           title: "Small Plastic Tuna",
//           price: 830,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9189",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1959",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6022",
//           ],
//         },
//         {
//           id: 117,
//           title: "Incredible Wooden Chair",
//           price: 109,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8411",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6512",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8442",
//           ],
//         },
//         {
//           id: 118,
//           title: "Rustic Cotton Gloves",
//           price: 880,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=964",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1047",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9462",
//           ],
//         },
//         {
//           id: 119,
//           title: "Intelligent Plastic Shirt",
//           price: 280,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8672",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9336",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3375",
//           ],
//         },
//         {
//           id: 120,
//           title: "Fantastic Granite Pizza",
//           price: 729,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6217",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4607",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2749",
//           ],
//         },
//         {
//           id: 121,
//           title: "Tasty Cotton Car",
//           price: 417,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1307",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6801",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3455",
//           ],
//         },
//         {
//           id: 122,
//           title: "Ergonomic Plastic Hat",
//           price: 7,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4697",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8109",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6120",
//           ],
//         },
//         {
//           id: 123,
//           title: "Fantastic Granite Gloves",
//           price: 157,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9293",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7184",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2014",
//           ],
//         },
//         {
//           id: 124,
//           title: "Ergonomic Plastic Salad",
//           price: 786,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=4278",
//             "https://api.lorem.space/image?w=640&h=480&r=1577",
//             "https://api.lorem.space/image?w=640&h=480&r=67",
//           ],
//         },
//         {
//           id: 125,
//           title: "Rustic Soft Shoes",
//           price: 380,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6046",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6971",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5932",
//           ],
//         },
//         {
//           id: 126,
//           title: "Small Soft Shirt",
//           price: 843,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=7411",
//             "https://api.lorem.space/image?w=640&h=480&r=340",
//             "https://api.lorem.space/image?w=640&h=480&r=3896",
//           ],
//         },
//         {
//           id: 127,
//           title: "Tasty Metal Pants",
//           price: 66,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9861",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5994",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7621",
//           ],
//         },
//         {
//           id: 128,
//           title: "Generic Fresh Chicken",
//           price: 582,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=9145",
//             "https://api.lorem.space/image?w=640&h=480&r=458",
//             "https://api.lorem.space/image?w=640&h=480&r=3902",
//           ],
//         },
//         {
//           id: 129,
//           title: "Small Concrete Gloves",
//           price: 118,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=3088",
//             "https://api.lorem.space/image?w=640&h=480&r=6444",
//             "https://api.lorem.space/image?w=640&h=480&r=9062",
//           ],
//         },
//         {
//           id: 130,
//           title: "Practical Metal Bike",
//           price: 600,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6504",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1915",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9769",
//           ],
//         },
//         {
//           id: 131,
//           title: "Refined Concrete Hat",
//           price: 622,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5526",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4133",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2101",
//           ],
//         },
//         {
//           id: 132,
//           title: "Handcrafted Soft Bacon",
//           price: 509,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4510",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5678",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5720",
//           ],
//         },
//         {
//           id: 133,
//           title: "Handmade Frozen Keyboard",
//           price: 476,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=6637",
//             "https://api.lorem.space/image?w=640&h=480&r=3721",
//             "https://api.lorem.space/image?w=640&h=480&r=4042",
//           ],
//         },
//         {
//           id: 134,
//           title: "Tasty Frozen Cheese",
//           price: 365,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=6844",
//             "https://api.lorem.space/image?w=640&h=480&r=4550",
//             "https://api.lorem.space/image?w=640&h=480&r=7431",
//           ],
//         },
//         {
//           id: 135,
//           title: "Fantastic Wooden Ball",
//           price: 178,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7615",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8306",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2441",
//           ],
//         },
//         {
//           id: 136,
//           title: "Rustic Frozen Sausages",
//           price: 166,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=469",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8328",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5003",
//           ],
//         },
//         {
//           id: 137,
//           title: "Generic Plastic Salad",
//           price: 345,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1034",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4112",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3899",
//           ],
//         },
//         {
//           id: 138,
//           title: "Ergonomic Steel Computer",
//           price: 165,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=383",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3074",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1073",
//           ],
//         },
//         {
//           id: 139,
//           title: "Practical Fresh Chicken",
//           price: 214,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6506",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2393",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3882",
//           ],
//         },
//         {
//           id: 140,
//           title: "Sleek Cotton Chicken",
//           price: 518,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6521",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1101",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7147",
//           ],
//         },
//         {
//           id: 141,
//           title: "Sleek Steel Gloves",
//           price: 507,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=4649",
//             "https://api.lorem.space/image?w=640&h=480&r=7323",
//             "https://api.lorem.space/image?w=640&h=480&r=3153",
//           ],
//         },
//         {
//           id: 142,
//           title: "Sleek Metal Soap",
//           price: 57,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5018",
//             "https://api.lorem.space/image?w=640&h=480&r=4825",
//             "https://api.lorem.space/image?w=640&h=480&r=1167",
//           ],
//         },
//         {
//           id: 143,
//           title: "Gorgeous Plastic Shoes",
//           price: 966,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=351",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9101",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3014",
//           ],
//         },
//         {
//           id: 144,
//           title: "Rustic Rubber Chips",
//           price: 879,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2105",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4635",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4106",
//           ],
//         },
//         {
//           id: 145,
//           title: "Incredible Fresh Towels",
//           price: 345,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1504",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=418",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7246",
//           ],
//         },
//         {
//           id: 146,
//           title: "Licensed Rubber Table",
//           price: 965,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3763",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2382",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3830",
//           ],
//         },
//         {
//           id: 147,
//           title: "Intelligent Rubber Ball",
//           price: 171,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5648",
//             "https://api.lorem.space/image?w=640&h=480&r=5520",
//             "https://api.lorem.space/image?w=640&h=480&r=2385",
//           ],
//         },
//         {
//           id: 148,
//           title: "Fantastic Plastic Ball",
//           price: 999,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=4491",
//             "https://api.lorem.space/image?w=640&h=480&r=6623",
//             "https://api.lorem.space/image?w=640&h=480&r=6285",
//           ],
//         },
//         {
//           id: 149,
//           title: "Refined Rubber Table",
//           price: 848,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5791",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7950",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8039",
//           ],
//         },
//         {
//           id: 150,
//           title: "Sleek Frozen Car",
//           price: 954,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=245",
//             "https://api.lorem.space/image?w=640&h=480&r=1305",
//             "https://api.lorem.space/image?w=640&h=480&r=710",
//           ],
//         },
//         {
//           id: 151,
//           title: "Ergonomic Concrete Fish",
//           price: 206,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5334",
//             "https://api.lorem.space/image?w=640&h=480&r=7778",
//             "https://api.lorem.space/image?w=640&h=480&r=3302",
//           ],
//         },
//         {
//           id: 152,
//           title: "Rustic Soft Mouse",
//           price: 134,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4826",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=701",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8525",
//           ],
//         },
//         {
//           id: 153,
//           title: "Awesome Wooden Sausages",
//           price: 7,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8965",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7007",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4187",
//           ],
//         },
//         {
//           id: 154,
//           title: "Generic Cotton Bike",
//           price: 725,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=299",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8590",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=361",
//           ],
//         },
//         {
//           id: 155,
//           title: "Small Concrete Mouse",
//           price: 198,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=2506",
//             "https://api.lorem.space/image?w=640&h=480&r=7844",
//             "https://api.lorem.space/image?w=640&h=480&r=8728",
//           ],
//         },
//         {
//           id: 156,
//           title: "Gorgeous Wooden Hat",
//           price: 372,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4926",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9530",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1463",
//           ],
//         },
//         {
//           id: 157,
//           title: "Sleek Wooden Hat",
//           price: 642,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=3233",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=230",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8474",
//           ],
//         },
//         {
//           id: 158,
//           title: "Sleek Fresh Chicken",
//           price: 123,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2064",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8133",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1605",
//           ],
//         },
//         {
//           id: 159,
//           title: "Fantastic Plastic Car",
//           price: 633,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7516",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4238",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2844",
//           ],
//         },
//         {
//           id: 160,
//           title: "Gorgeous Cotton Pants",
//           price: 49,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4565",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9816",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1886",
//           ],
//         },
//         {
//           id: 161,
//           title: "Intelligent Rubber Gloves",
//           price: 487,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1825",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7271",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8350",
//           ],
//         },
//         {
//           id: 162,
//           title: "Refined Granite Sausages",
//           price: 17,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=1628",
//             "https://api.lorem.space/image?w=640&h=480&r=557",
//             "https://api.lorem.space/image?w=640&h=480&r=943",
//           ],
//         },
//         {
//           id: 163,
//           title: "Tasty Concrete Chair",
//           price: 510,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=494",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2996",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7616",
//           ],
//         },
//         {
//           id: 164,
//           title: "Tasty Concrete Shoes",
//           price: 658,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6277",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2751",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7887",
//           ],
//         },
//         {
//           id: 165,
//           title: "Sleek Frozen Gloves",
//           price: 753,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8798",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8162",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5000",
//           ],
//         },
//         {
//           id: 166,
//           title: "Licensed Wooden Computer",
//           price: 832,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4069",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6438",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=1523",
//           ],
//         },
//         {
//           id: 167,
//           title: "Unbranded Metal Chicken",
//           price: 742,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2743",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9379",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=367",
//           ],
//         },
//         {
//           id: 168,
//           title: "Tasty Steel Table",
//           price: 60,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=660",
//             "https://api.lorem.space/image?w=640&h=480&r=907",
//             "https://api.lorem.space/image?w=640&h=480&r=1484",
//           ],
//         },
//         {
//           id: 169,
//           title: "Practical Metal Bike",
//           price: 626,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=5179",
//             "https://api.lorem.space/image?w=640&h=480&r=6960",
//             "https://api.lorem.space/image?w=640&h=480&r=1400",
//           ],
//         },
//         {
//           id: 170,
//           title: "Generic Granite Gloves",
//           price: 617,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8960",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=6400",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7843",
//           ],
//         },
//         {
//           id: 171,
//           title: "Generic Fresh Chair",
//           price: 632,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9913",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4442",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5995",
//           ],
//         },
//         {
//           id: 172,
//           title: "Awesome Rubber Ball",
//           price: 501,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5036",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8499",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6344",
//           ],
//         },
//         {
//           id: 173,
//           title: "Tasty Granite Computer",
//           price: 600,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=2472",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4467",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7352",
//           ],
//         },
//         {
//           id: 174,
//           title: "Gorgeous Metal Keyboard",
//           price: 382,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9147",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6455",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=8568",
//           ],
//         },
//         {
//           id: 175,
//           title: "Generic Granite Mouse",
//           price: 325,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=8779",
//             "https://api.lorem.space/image?w=640&h=480&r=9571",
//             "https://api.lorem.space/image?w=640&h=480&r=7376",
//           ],
//         },
//         {
//           id: 176,
//           title: "Incredible Rubber Bacon",
//           price: 121,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=1226",
//             "https://api.lorem.space/image?w=640&h=480&r=6658",
//             "https://api.lorem.space/image?w=640&h=480&r=3642",
//           ],
//         },
//         {
//           id: 177,
//           title: "Rustic Fresh Car",
//           price: 909,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9343",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2833",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3874",
//           ],
//         },
//         {
//           id: 178,
//           title: "Generic Fresh Chair",
//           price: 231,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9314",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7616",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9193",
//           ],
//         },
//         {
//           id: 179,
//           title: "Handcrafted Granite Chicken",
//           price: 780,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7027",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2557",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4826",
//           ],
//         },
//         {
//           id: 180,
//           title: "Rustic Metal Ball",
//           price: 165,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=9197",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=7049",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=5586",
//           ],
//         },
//         {
//           id: 181,
//           title: "Intelligent Metal Salad",
//           price: 404,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=5300",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=6035",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9043",
//           ],
//         },
//         {
//           id: 182,
//           title: "Licensed Plastic Hat",
//           price: 698,
//           description:
//             "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1020",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9411",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9129",
//           ],
//         },
//         {
//           id: 183,
//           title: "Ergonomic Wooden Pants",
//           price: 404,
//           description:
//             "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6131",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2097",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2617",
//           ],
//         },
//         {
//           id: 184,
//           title: "Handmade Rubber Chair",
//           price: 811,
//           description:
//             "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=4584",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9987",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7806",
//           ],
//         },
//         {
//           id: 185,
//           title: "Generic Concrete Fish",
//           price: 430,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2661",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6166",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2688",
//           ],
//         },
//         {
//           id: 186,
//           title: "Gorgeous Wooden Chicken",
//           price: 830,
//           description:
//             "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=2199",
//             "https://api.lorem.space/image?w=640&h=480&r=6230",
//             "https://api.lorem.space/image?w=640&h=480&r=408",
//           ],
//         },
//         {
//           id: 187,
//           title: "Licensed Fresh Shoes",
//           price: 374,
//           description:
//             "The Football Is Good For Training And Recreational Purposes",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1445",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2936",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=8356",
//           ],
//         },
//         {
//           id: 188,
//           title: "Rustic Granite Chair",
//           price: 908,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=7076",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=580",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6817",
//           ],
//         },
//         {
//           id: 189,
//           title: "Licensed Plastic Chair",
//           price: 482,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 3,
//             name: "Furniture",
//             image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8610",
//           },
//           images: [
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=4946",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=8642",
//             "https://api.lorem.space/image/furniture?w=640&h=480&r=6498",
//           ],
//         },
//         {
//           id: 190,
//           title: "Incredible Concrete Tuna",
//           price: 597,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 5,
//             name: "Others",
//             image: "https://api.lorem.space/image?w=640&h=480&r=4589",
//           },
//           images: [
//             "https://api.lorem.space/image?w=640&h=480&r=7307",
//             "https://api.lorem.space/image?w=640&h=480&r=7762",
//             "https://api.lorem.space/image?w=640&h=480&r=2425",
//           ],
//         },
//         {
//           id: 191,
//           title: "Incredible Fresh Gloves",
//           price: 466,
//           description:
//             "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3259",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=2592",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=7703",
//           ],
//         },
//         {
//           id: 192,
//           title: "Incredible Steel Tuna",
//           price: 481,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6852",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1100",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=688",
//           ],
//         },
//         {
//           id: 193,
//           title: "Fantastic Cotton Hat",
//           price: 361,
//           description:
//             "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=9450",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=5240",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=2266",
//           ],
//         },
//         {
//           id: 194,
//           title: "Unbranded Granite Fish",
//           price: 708,
//           description:
//             "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9909",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=3540",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=4342",
//           ],
//         },
//         {
//           id: 195,
//           title: "Refined Steel Chips",
//           price: 879,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=61",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=5835",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=9718",
//           ],
//         },
//         {
//           id: 196,
//           title: "Intelligent Fresh Gloves",
//           price: 231,
//           description:
//             "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=3611",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=1975",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4645",
//           ],
//         },
//         {
//           id: 197,
//           title: "Practical Concrete Car",
//           price: 773,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 1,
//             name: "Clothes",
//             image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
//           },
//           images: [
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=7242",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=1803",
//             "https://api.lorem.space/image/fashion?w=640&h=480&r=8001",
//           ],
//         },
//         {
//           id: 198,
//           title: "Handmade Rubber Pizza",
//           price: 491,
//           description:
//             "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9191",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9092",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=9910",
//           ],
//         },
//         {
//           id: 199,
//           title: "Awesome Frozen Computer",
//           price: 682,
//           description:
//             "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
//           category: {
//             id: 4,
//             name: "Shoes",
//             image: "https://api.lorem.space/image/shoes?w=640&h=480&r=9537",
//           },
//           images: [
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=4587",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=438",
//             "https://api.lorem.space/image/shoes?w=640&h=480&r=974",
//           ],
//         },
//         {
//           id: 200,
//           title: "Generic Wooden Bike",
//           price: 869,
//           description:
//             "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
//           category: {
//             id: 2,
//             name: "Electronics",
//             image: "https://api.lorem.space/image/watch?w=640&h=480&r=757",
//           },
//           images: [
//             "https://api.lorem.space/image/watch?w=640&h=480&r=6928",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=2293",
//             "https://api.lorem.space/image/watch?w=640&h=480&r=1535",
//           ],
//         },
//       ],
//       users: [
//         { name: "Amr" },
//         { name: "Osama" },
//         { name: "Ahmed" },
//         { name: "Mohamed" },
//       ],
//       isAuthenticated: true,
//     };
//   }

//   render() {
//     return (
//       <div className="section-allProducts container grid">
//         {/* Conditional Rendering */}

//         {this.state.isAuthenticated ? (
//           <div className="row">
//             {this.state.allProducts.map((movie) => (
//               <div className="col">
//                 <div className="card" style={{ width: "15rem" }}>
//                   <img
//                     className="card-img-top"
//                     src={movie.category.image}
//                     alt="Card image cap"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{movie.title}</h5>
//                     <p className="price">
//                       <strong>$</strong>
//                       <span> {movie.price}</span>
//                     </p>
//                     <p className="card-text">{movie.description}</p>
//                     <button className="btn-details btn btn-primary">
//                       Show Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="container not-found">
//             <p>Products are not available</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
