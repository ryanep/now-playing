import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AddedBy from "./index";

describe("components/AddedBy", () => {
  const name = "__name__";
  const photo = "__photo__";

  // Snapshot testing
  it("renders the name and photo provided", () => {
    const component = renderer.create(<AddedBy name={name} photo={photo} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders only the name when no photo is provided", () => {
    const component = renderer.create(<AddedBy name={name} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // DOM Assertion
  it("renders the name provided", () => {
    const component = shallow(<AddedBy name={name} />);
    expect(component.find("#added-by-name").text()).toEqual("__name__");
  });

  it("renders only the name when only a name is provided", () => {
    const component = shallow(<AddedBy name={name} />);
    expect(component.find("img")).toHaveLength(0);
  });

  it("renders the name and photo provided", () => {
    const component = shallow(<AddedBy name={name} photo={photo} />);
    expect(component.find("#added-by-name").text()).toEqual("__name__");
    expect(component.find("img").prop("src")).toEqual("__photo__");
    expect(component.find("img").prop("alt")).toEqual("__name__");
  });
});
