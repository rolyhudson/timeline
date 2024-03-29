import React, { useState, useEffect } from "react";
import Phase from "./Phase";
import { MdAddCircleOutline } from "react-icons/md";
import { genRanHex } from "./GenRanHex";

export default function Timeline(props) {
  const [phases, setPhases] = useState([
    { name: "phase_0", id: genRanHex(24) },
  ]);

  let zoomStyle = {
    transformOrigin: "0% 0%",
    transform: `scale(${props.zoomScale},${props.zoomScale})`,
    display: "flex",
    flexDirection: "row",
    flexWrap: " nowrap",
    alignItems: "center",
  };
  useEffect(() => {
    zoomStyle = {
      transform: `scale(${props.zoomScale},${props.zoomScale})`,
    };
  });

  return (
    <div style={zoomStyle}>
      {phases.map((phase, i) => {
        return (
          <div className="phase" key={i}>
            <Phase name={phase.name} id={phase.id} />
            <div className="phaseEnd">
              <span />
              <span className="tooltip">
                <MdAddCircleOutline
                  onClick={() =>
                    setPhases([
                      ...phases,
                      { name: "phase_" + phases.length, id: genRanHex(24) },
                    ])
                  }
                />
                <span className="tooltiptext">add phase</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
