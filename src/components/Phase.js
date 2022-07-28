import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import DesignStudy from "./designStudy/DesignStudy";
import { useSelector, useDispatch } from "react-redux";
import { genRanHex } from "./GenRanHex";
import { updateDesignStudy } from "./designStudy/designStudySlice";

import { useUpdateDesignStudyMutation } from "./designStudy/designStudyApiSlice";
///////////////////////
//Component
export default function Phase(props) {
  //get all children (studies) could also come via rtk query
  let studies = useSelector((state) => state.designStudy.value);

  //filter for those related to this parent (phase)
  let [childStudies, setChildStudies] = useState(
    studies.filter((s) => s.phase_id === props.id)
  );

  //init study state and study object
  let [studyState, setStudyState] = useState({
    open: false,
    studyObject: { name: "new study" },
  });

  //new study open modal triggered
  const addStudy = () => {
    let study = { id: genRanHex(24), phase_id: props.id, name: "new study" };
    setStudyState({ open: true, studyObject: study });
  };

  //edit study open modal triggered with study object from child studies
  const editStudy = (study_id) => {
    let study = childStudies.find((obj) => obj.id === study_id);
    setStudyState({ open: true, studyObject: study });
  };

  const closeStudy = () => {
    //update the state.open property
    setStudyState({ ...studyState, open: false, id: undefined });
    setChildStudies(studies.filter((s) => s.phase_id === props.id));
    console.log("studies created: ", studies);
  };

  //update in db the child studies for this phase
  const [updateDesignStudyApi, response1] = useUpdateDesignStudyMutation();
  useEffect(() => {
    childStudies.forEach((element) => {
      console.log("updating", element.name);
      updateDesignStudyApi(element);
      //console.log(response1);
    });
  }, [childStudies]);

  //update when studies in store has changed
  useEffect(() => {
    setChildStudies(studies.filter((s) => s.phase_id === props.id));
  }, [studies]);

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
