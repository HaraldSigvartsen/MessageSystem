import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
import { FrontPage } from "./FrontPage";
import { MessagePage } from "./MessagePage";
import React from "react";

export function Application() {
  return (
    <BrowserRouter>
      <header>
        <h1>Message System</h1>
        <ul>
          <li>
            <Link to={"/"}>Front page</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to={"/message"}>Message</Link>
          </li>
          <li>
            <Link to={"/login"}>Log In</Link>
          </li>
        </ul>
      </header>
      <Switch>
        <Route path={"/profile"}>
          <ProfilePage />
        </Route>
        <Route path={"/login"}>
          <LoginPage />
        </Route>
        <Route path={"/message"}>
          <MessagePage />
        </Route>
        <Route exact path={"/"}>
          <FrontPage />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
