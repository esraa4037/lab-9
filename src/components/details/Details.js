import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function Details() {
  let params = useParams();
  console.log(params);

  return (
    <div>
      <br />
      <h1>Details</h1>
      <br />
      <h1>product ID: {params.id}</h1>
    </div>
  );
}
