import { ErrorView } from "../client/Components/ErrorView";
import React from "react";
import renderer from "react-test-renderer";

describe("loading error ", () => {
  it("show loading error on dom", () => {
    const container = renderer.create(<ErrorView />).toJSON();
    expect(container).toMatchSnapshot();
  });
});
