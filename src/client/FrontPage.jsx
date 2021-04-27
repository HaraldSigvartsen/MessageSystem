import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <header></header>
      <ul>
        <li>
          <Link to={"/profile"}>Profile page</Link>
        </li>
        <li>
          <Link to={"/message"}>Message</Link>
        </li>
        <li>
          <Link to={"/login"}>Log in</Link>
        </li>
      </ul>
    </div>
  );
}
