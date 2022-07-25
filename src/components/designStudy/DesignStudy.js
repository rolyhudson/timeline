import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { updateDesignStudy } from "./designStudySlice";
import { MdAddCircleOutline } from "react-icons/md";
import {
  useGetOptionsQuery,
  useCreateProjectMutation,
  useCreateDesignStudyMutation,
} from "../api/designStudyApiSlice";

import "./designStudy.css";
import SummaryBar from "./SummaryBar";
import DecisionAnalysis from "../decisionAnalysis/DecisionAnalysis";
import { genRanHex } from "../GenRanHex";
///////////////////////

export default function DesignStudy(props) {
  let analyses = useSelector((state) => state.decisionAnalysis.value);

  const [decisionAnalyses, setDecisisonAnalyses] = useState([]);

  const [studyObject, setStudyObject] = useState({
    name: "new study",
    id: props.state.id,
    phase_id: props.phase_id,
  });

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(props.state.open);
  Modal.setAppElement("#root");

  function afterOpenModal() {
    if (props.state.edit) {
      //fetch decision analyses if in edit mode

      setDecisisonAnalyses(
        analyses.filter((s) => s.designstudy_id === props.state.study.id)
      );
      console.log(decisionAnalyses);
      setStudyObject(props.state.study);
    } else {
      setStudyObject({
        name: "new study",
        id: props.state.id,
        phase_id: props.phase_id,
      });
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(props.state.open);
  }, [props.state.open]);

  //update or create the study object in redux store
  useEffect(() => {
    if (studyObject.id !== undefined) {
      dispatch(updateDesignStudy(studyObject));
    }
  });

  const {
    data: options,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOptionsQuery();

  let content;

  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = options;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  const [createDesignStudyApi, response1] = useCreateDesignStudyMutation();

  const saveStudy = () => {
    createDesignStudyApi(studyObject)
      .unwrap()
      .then(() => {})
      .then((error) => {});
  };

  const handleNameChange = (event) => {
    setStudyObject({ ...studyObject, name: event.target.value });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="header">
          {props.state.edit ? (
            <span>Edit Design study:</span>
          ) : (
            <span>New Design study:</span>
          )}

          <input
            type="text"
            value={studyObject.name}
            onChange={handleNameChange}
          />

          <button onClick={props.close}>close</button>
          <button onClick={saveStudy}>save</button>
        </div>

        <div className="flex-container">
          <div className="leftBar">
            <SummaryBar />
          </div>
          <div className="analysisPanel">
            {decisionAnalyses.map((decisionAnalysis, i) => {
              return (
                <DecisionAnalysis
                  key={i}
                  options={content}
                  parent_id={studyObject.id}
                  id={decisionAnalysis}
                />
              );
            })}
            <span className="tooltip">
              <MdAddCircleOutline
                onClick={() =>
                  setDecisisonAnalyses([...decisionAnalyses, undefined])
                }
              />
              <span className="tooltiptext">add decision analysis</span>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
