import React from "react";
import { shallow } from "enzyme";
import Background from './index';

describe("components/Background", () => {
  const img = "__img__";

  it("renders the name provided", () => {
    const component = shallow(<Background img={img} />);
    expect(component.find("img").props().src).toEqual("__img__");
  });
});
