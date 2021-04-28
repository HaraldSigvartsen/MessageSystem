import { ProfilePage } from "../client/ProfilePage";
import { fetchJson, FetchJson } from "../client/http";
import React from "react";
import renderer from "react-test-renderer";

describe("profile loading", () => {
  it("show profile on container", () => {
    const container = renderer.create(<ProfilePage />, <fetchJson />).toJSON();
    expect(container).toMatchSnapshot();
  });
});
