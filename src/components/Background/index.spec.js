import React from "react";
import { shallow, render, mount } from "enzyme";
import renderer from "react-test-renderer";
import Background from "./index";
import StackBlur from "stackblur-canvas";
import * as canvasUtils from "../../util/canvas";

describe("components/Background", () => {
  const img = "__img__";
  let component;

  it("renders without crashing", () => {
    mount(<Background img={img} />);
  });

  beforeEach(() => {
    component = mount(<Background img={img} />);
  });

  afterEach(() => {
    component = null;
  });

  it("sets this.container on render", () => {
    expect(component.instance().container).toBeTruthy();
  });

  it("sets this.canvas on render", () => {
    expect(component.instance().canvas).toBeTruthy();
  });

  it("hides the canvas when state.loaded is false", () => {
    expect(component.state().loaded).toBeFalsy();
    expect(component.find("canvas").hasClass("hidden")).toBeTruthy();
  });

  it("shows the canvas when state.loaded is true", () => {
    component.setState({ loaded: true });
    expect(component.find("canvas").hasClass("hidden")).toBeFalsy();
  });

  describe("componentDidMount", () => {
    let mock;

    beforeEach(() => {
      mock = jest
        .spyOn(component.instance(), "updateCanvas")
        .mockReturnValue(Promise.resolve());
    });

    afterEach(() => {
      mock.mockClear();
    });

    it("returns a promise", () => {
      const promise = component.instance().componentDidMount();
      expect(promise instanceof Promise).toBeTruthy();
    });

    it("calls updateCanvas with the canvas and image", async () => {
      await component.instance().componentDidMount();
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(
        component.instance().canvas,
        component.instance().props.img
      );
    });

    it("updates the state loaded to true", async () => {
      await component.instance().componentDidMount();
      expect(component.state("loaded")).toBeTruthy();
    });

    it("forces an update", async () => {
      const updateMock = jest.spyOn(component.instance(), "forceUpdate");
      await component.instance().componentDidMount();
      expect(updateMock).toHaveBeenCalled();
    });
  });

  describe("componentWillUpdate", () => {
    const updatedImg = "__updated_img__";
    let mock;

    beforeEach(() => {
      mock = jest
        .spyOn(component.instance(), "updateCanvas")
        .mockReturnValue(Promise.resolve());
    });

    afterEach(() => {
      mock.mockClear();
    });

    it("calls updateCanvas with the canvas and the updated props", async () => {
      await component.instance().componentWillUpdate({ img: updatedImg });
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(
        component.instance().canvas,
        updatedImg
      );
    });

    it("calls addClassToFadeCanvas", async () => {
      const addClassMock = jest
        .spyOn(component.instance(), "addClassToFadeCanvas")
        .mockReturnValue(Promise.resolve());

      await component.instance().componentWillUpdate({ img: updatedImg });
      expect(addClassMock).toHaveBeenCalled();
    });

    it("calls removeCanvasFromDom", async () => {
      const removeCanvasMock = jest
        .spyOn(component.instance(), "removeCanvasFromDom")
        .mockReturnValue(Promise.resolve());

      await component.instance().componentWillUpdate({ img: updatedImg });
      expect(removeCanvasMock).toHaveBeenCalled();
    });

    it("logs the error when an exception is thrown in the promise chain", async () => {
      global.console = {
        log: jest.fn()
      };

      const removeCanvasMock = jest
        .spyOn(component.instance(), "removeCanvasFromDom")
        .mockReturnValue(Promise.reject("__error__"));

      await component.instance().componentWillUpdate({ img: updatedImg });
      expect(global.console.log).toHaveBeenCalled();
      expect(global.console.log).toHaveBeenCalledWith("__error__");
    });
  });

  describe("cloneCanvasInPlace", () => {
    beforeEach(() => {
      component.instance().cloneCanvasInPlace();
    });

    it("sets the canvas the same height and width as the existing canvas", () => {
      expect(component.instance().tempCanvas.width).toEqual(
        component.instance().canvas.width
      );
      expect(component.instance().tempCanvas.height).toEqual(
        component.instance().canvas.height
      );
    });

    it("adds the 'canvas' className to the canvas node", () => {
      expect(
        component.instance().tempCanvas.classList.contains("canvas")
      ).toBeTruthy();
    });

    it("sets the assigns the canvas to \`this.tempCanvas`'", () => {
      expect(component.instance().tempCanvas).toBeTruthy();
    });
  });

  describe("addClassToFadeCanvas", async () => {
    beforeEach(async () => {
      component.instance().cloneCanvasInPlace();
    });

    it("returns a promise", () => {
      const promise = component.instance().addClassToFadeCanvas();
      expect(promise instanceof Promise).toBeTruthy();
    });

    it("hides the tempCanvas", async () => {
      await component.instance().addClassToFadeCanvas();
      expect(
        component.instance().tempCanvas.classList.contains("hidden")
      ).toBeTruthy();
    });

    it("resolves the promise", () => {
      return expect(component.instance().addClassToFadeCanvas()).resolves.toBe(
        undefined
      );
    });
  });

  describe("removeCanvasFromDom", () => {
    beforeEach(async () => {
      component.instance().cloneCanvasInPlace();
    });

    it("calls remove() on this.tempCanvas", () => {
      const mock = jest.spyOn(component.instance().tempCanvas, "remove");
      component.instance().removeCanvasFromDom();
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateCanvas", () => {
    const ctx = "__ctx__";
    const url = "__url__";
    let canvas;

    beforeEach(() => {
      canvas = { getContext: jest.fn(() => ctx) };
    });

    it("returns a promise", () => {
      const promise = component.instance().updateCanvas(canvas, url);
      expect(promise instanceof Promise).toBeTruthy();
    });

    xit(
      "calls backgroundSizeCover with the canvas context and the img",
      done => {
        // Test was timing out before onload was called, potentially need to mock it
        // call it manually, skipping for now.
        const mock = jest.spyOn(canvasUtils, "backgroundSizeCover");
        return component.instance().updateCanvas(canvas, url).then(_ => {
          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith(ctx, img);
          done();
        });
      }
    );
  });
});
