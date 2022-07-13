import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import DesignStudy from "./designStudy/DesignStudy";

export default function Phase(props) {
  let [studies, setStudies] = useState([{ name: "new study" }]);
  let [openStudy, setOpenStudy] = useState(false);

  const addStudy = () => {
    setOpenStudy(true);
    return setStudies([...studies, { name: "new study" }]);
  };

  const closeStudy = () => {
    setOpenStudy(false);
  };

  return (
    <div>
      <div className="studies">
        {studies.map((study, i) => {
          return (
            <div className="study" key={i}>
              s
            </div>
          );
        })}
      </div>
      <div className="phaseline">
        <div className="title">{props.name}</div>
        <div className="addStudy tooltip">
          <span className="tooltiptext">add study</span>
          <MdAddCircle onClick={addStudy}></MdAddCircle>
        </div>
        <DesignStudy open={openStudy} close={closeStudy} />
      </div>
    </div>
  );
}
