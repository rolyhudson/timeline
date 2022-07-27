import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import DesignStudy from "./designStudy/DesignStudy";
import { useSelector, useDispatch } from "react-redux";
import { genRanHex } from "./GenRanHex";
import { updateDesignStudy } from "./designStudy/designStudySlice";

export default function Phase(props) {
  let studies = useSelector((state) => state.designStudy.value);
  let [childStudies, setChildStudies] = useState(
    studies.filter((s) => s.phase_id === props.id)
  );

  let [studyState, setStudyState] = useState({
    open: false,
    studyObject: { name: "new study" },
  });

  const addStudy = () => {
    let study = { id: genRanHex(24), phase_id: props.id, name: "new study" };
    setStudyState({ open: true, studyObject: study });
  };

  const editStudy = (study_id) => {
    let study = childStudies.find((obj) => obj.id === study_id);
    setStudyState({ open: true, studyObject: study });
  };

  const closeStudy = () => {
    //update the state.open property
    setStudyState({ ...studyState, open: false, id: undefined });
    setChildStudies(studies.filter((s) => s.phase_id === props.id));
    console.log("studies created:", studies);
  };

  return (
    <div>
      <div className="studies">
        {childStudies.map((study, i) => {
          return (
            <div className="study" key={i} onClick={() => editStudy(study.id)}>
              {study.name}
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
        <DesignStudy state={studyState} close={closeStudy} />
      </div>
    </div>
  );
}
