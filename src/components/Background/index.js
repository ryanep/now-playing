import React, { Component } from "react";
import StackBlur from "stackblur-canvas";
import { backgroundSizeCover } from "../../util/canvas";
import styles from "./style.scss";

export default class Background extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    return this.updateCanvas(this.canvas, this.props.img).then(() => {
      this.setState({ loaded: true });
      this.forceUpdate();
    });
  }

  componentWillUpdate(nextProps) {
    this.cloneCanvasInPlace();
    return this.updateCanvas(this.canvas, nextProps.img)
      .then(() => this.addClassToFadeCanvas())
      .then(() => this.removeCanvasFromDom())
      .catch(error => console.log(error));
  }

  cloneCanvasInPlace = () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    canvas.classList.add(`${styles.canvas}`);
    canvas.id = "temp-canvas";
    ctx.drawImage(this.canvas, 0, 0);
    this.tempCanvas = canvas;
    this.container.appendChild(canvas);
  };

  addClassToFadeCanvas = () =>
    new Promise(resolve => {
      this.tempCanvas.classList.add(`${styles.hidden}`);

      setTimeout(
        () => {
          resolve();
        },
        1000
      );
    });

  removeCanvasFromDom = () => {
    this.tempCanvas.remove();
  };

  updateCanvas = (canvas, url) =>
    new Promise(resolve => {
      const ctx = canvas.getContext("2d");
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.style.width = window.innerWidth;
      img.onload = () => {
        backgroundSizeCover(ctx, img).then(() => {
          StackBlur.canvasRGB(
            canvas,
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height,
            15
          );
          resolve();
        });
      };
    });

  render() {
    return (
      <div className={styles.container} ref={c => this.container = c}>
        <canvas
          className={
            `${styles.canvas} ${this.state.loaded ? "" : styles.hidden}`
          }
          ref={c => this.canvas = c}
        />
      </div>
    );
  }
}
