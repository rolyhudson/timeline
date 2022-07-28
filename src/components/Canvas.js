import { useState } from "react";
import Timeline from "./Timeline";
import Preloader from "./preloaders/Preloader";
import { MdZoomIn, MdZoomOut, MdZoomOutMap } from "react-icons/md";
import StoreStatus from "./StoreStatus";
export default function Canvas() {
  let [scale, setScale] = useState(1);

  function zoomIn() {
    if (scale > 2) return;
    setScale((scale += 0.1));
  }
  function zoomOut() {
    console.log(scale);
    if (scale < 0.4) return;
    setScale((scale -= 0.1));
  }
  function zoomFit() {
    setScale(1);
  }
  return (
    <>
      <div className="control">
        <Preloader />
        <div>
          <StoreStatus />
        </div>
        <h1>
          <div className="tooltip">
            <span className="tooltiptext">zoom in</span>
            <MdZoomIn onClick={zoomIn} />
          </div>

          <div className="tooltip">
            <span className="tooltiptext">zoom out</span>
            <MdZoomOut onClick={zoomOut} />
          </div>

          <div className="tooltip">
            <span className="tooltiptext">zoom reset</span>
            <MdZoomOutMap onClick={zoomFit} />
          </div>
        </h1>
      </div>
      <div className="scroll">
        <Timeline zoomScale={scale} />
      </div>
    </>
  );
}
