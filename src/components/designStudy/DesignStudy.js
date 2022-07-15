import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { addDesignStudy, updateDesignStudy } from "./designStudySlice";
import { MdAddCircleOutline } from "react-icons/md";
import {
  useGetOptionsQuery,
  useCreateProjectMutation,
  useCreateDesignStudyMutation,
} from "../api/apiSlice";
import { v4 as uuidv4 } from "uuid";

import "./designStudy.css";
import SummaryBar from "./SummaryBar";
import DecisionAnalysis from "../decisionAnalysis/DecisionAnalysis";

export default function DesignStudy(props) {
  const [decisionAnalyses, setDecisisonAnalyses] = useState([
    <DecisionAnalysis />,
  ]);

  let studyObject = {};
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(props.state.open);
  Modal.setAppElement("#root");

  function afterOpenModal() {
    //add to store
    if (props.state.edit) {
      //look up by id
    } else {
      studyObject = {
        name: "new design study",
        id: props.state.id,
        phase_id: props.phase_id,
      };
      dispatch(addDesignStudy(studyObject));
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(props.state.open);
  }, [props.state.open]);

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

  const [createProject, response] = useCreateProjectMutation();
  const [createDesignStudy, response1] = useCreateDesignStudyMutation();
  const testpost = () => {
    createProject({ name: "testProject" })
      .unwrap()
      .then(() => {})
      .then((error) => {});
  };

  const saveStudy = () => {
    createDesignStudy(
      (studyObject = {
        name: "test study 1",
        id: props.state.id,
        phase_id: props.phase_id,
      })
    )
      .unwrap()
      .then(() => {})
      .then((error) => {});
  };

  const handleNameChange = (event) => {
    studyObject = {
      name: event.target.value,
      id: props.state.id,
      phase_id: props.phase_id,
    };

    dispatch(updateDesignStudy(studyObject));
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
              return <DecisionAnalysis key={i} options={content} />;
            })}
            <span className="tooltip">
              <MdAddCircleOutline
                onClick={() =>
                  setDecisisonAnalyses([
                    ...decisionAnalyses,
                    <DecisionAnalysis />,
                  ])
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
