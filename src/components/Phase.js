import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import DesignStudy from "./designStudy/DesignStudy";
import { useSelector } from "react-redux";
import { genRanHex } from "./GenRanHex";

export default function Phase(props) {
  let studies = useSelector((state) => state.designStudy.value);

  let [studyState, setStudyState] = useState({
    open: false,
    edit: false,
  });

  studies = studies.filter((s) => s.phase_id === props.id);

  const addStudy = (study_id) => {
    setStudyState({ open: true, edit: false, id: study_id });
  };

  const editStudy = (study_id) => {
    let study = studies.find((obj) => obj.id === study_id);
    setStudyState({ open: true, edit: true, study: study });
  };

  const closeStudy = () => {
    setStudyState({ open: false, edit: false });
    console.log(studies);
  };

  return (
    <div>
      <div className="studies">
        {studies.map((study, i) => {
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
          <MdAddCircle onClick={() => addStudy(genRanHex(24))}></MdAddCircle>
        </div>
        <DesignStudy
          state={studyState}
          close={closeStudy}
          phase_id={props.id}
        />
      </div>
    </div>
  );
}
