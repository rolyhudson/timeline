import React, { useState, useEffect } from "react";
export default function Phase(props) {
  let [studies, setStudies] = useState([
    { name: "new study" },
    { name: "new study" },
    { name: "new study" },
  ]);

  const addStudy = () => {
    return setStudies([...studies, { name: "new study" }]);
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
      <div className="line">
        <div className="title">{props.name}</div>
        <div className="addStudy tooltip" onClick={addStudy}>
          <span className="tooltiptext">add study</span>+
        </div>
      </div>
    </div>
  );
}
