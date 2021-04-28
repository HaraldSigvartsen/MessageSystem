import { LoadingView } from "../client/Components/LoadingView";
import React from "react";
import renderer from "react-test-renderer";

describe("loading view", () => {
  it("show loading view on dom", () => {
    const container = renderer.create(<LoadingView />).toJSON();
    expect(container).toMatchSnapshot();
  });
});
