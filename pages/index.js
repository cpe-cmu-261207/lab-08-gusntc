import ColorPickerContainer from "../components/ColorPickerContainer";
import Header from "../components/Header";
import { PainterContext } from "../contexts/PainterContext";
import { useState } from "react";
import Canvas from "../components/Canvas";
import CanvasLib from "../libs/CanvasLib";

export default function Home() {
  //selected color from color picker
  //set black color as default
  const [selColor, setSelColor] = useState("#000000");

  //16x16 2D Array that holds color data
  const [pixels, setPixels] = useState(CanvasLib.createEmptyCanvas());

  //will be called by Cell component
  const paint = (xPos, yPos) => {
    //copy from old 2d Array
    const newPixels = CanvasLib.copyCanvas(pixels);
    newPixels[yPos][xPos] = selColor;
    setPixels(newPixels);
    //your code here
  };

  // const RandomColors = () => {
  //   const newPixels = CanvasLib.createRandomCanvas();
  //   setPixels(newPixels);
  // };

  function RandomColors() {
    const newPixels = CanvasLib.createRandomCanvas();
    setPixels(newPixels);
  }

  const clear = () => {
    const newPixels = CanvasLib.createEmptyCanvas();
    setPixels(newPixels);
    //your code here
    //Hint : use CanvasLib.createEmptyCanvas()
  };

  const [IntervalId, setIntervalId] = useState([]);

  const PlayInterval = () => {
    const id = setInterval(RandomColors, 10);
    setIntervalId([...IntervalId, id]);
  };

  const StopInterval = () => {
    for (const id of IntervalId) {
      clearInterval(id);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "GhostWhite" }}>
      <PainterContext.Provider value={{ selColor, setSelColor, pixels, paint }}>
        <Header />
        <ColorPickerContainer />
        <Canvas />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-dark" onClick={clear}>
            Clear
          </button>
          <button className="btn btn-dark" onClick={RandomColors}>
            Random Color
          </button>
          <button className="btn btn-dark" onClick={PlayInterval}>
            Disco
          </button>
          <button className="btn btn-dark" onClick={StopInterval}>
            Stop
          </button>
        </div>
      </PainterContext.Provider>
    </div>
  );
}
