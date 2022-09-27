import React from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  console.log("Hello from Link constructor");
  console.log(props);

  return (
    <li className={props.className[0]}>
      <Link
        style={{ textDecoration: "none" }}
        className={props.className[1]}
        to={props.data || "/"}
      >
        {props.content}
      </Link>
    </li>
  );
};
export default NavLink;
