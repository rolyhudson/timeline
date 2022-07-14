import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { addMCDA } from "./designStudySlice";
import { MdAddCircleOutline } from "react-icons/md";
import { useGetOptionsQuery, useCreateProjectMutation } from "../api/apiSlice";

import "./designStudy.css";
import SummaryBar from "./SummaryBar";
import DecisionAnalysis from "../decisionAnalysis/DecisionAnalysis";

export default function DesignStudy(props) {
  useCreateProjectMutation();
  const [decisionAnalyses, setDecisisonAnalyses] = useState([
    <DecisionAnalysis />,
  ]);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(props.open);
  Modal.setAppElement("#root");
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

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

  const testpost = () => {
    console.log(response);
    createProject({ name: "testProject" })
      .unwrap()
      .then(() => {})
      .then((error) => {
        console.log("error", error);
      });
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
          <span>Design study:</span>
          <input />
          <button onClick={props.close}>close</button>
          <button onClick={testpost}>save</button>
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
