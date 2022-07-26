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
  let [copy, setCopy] = useState({ ...props.state.studyObject });
  const [decisionAnalyses, setDecisisonAnalyses] = useState([]);

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");

  function afterOpenModal() {
    if (props.state.studyObject.id !== undefined) {
      //clone only once the id is set
      console.log("cloning", props.state.studyObject.id);
      setCopy({ ...props.state.studyObject });
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(props.state.open);
  }, [props.state.open]);

  const nameChanged = (event) => {
    console.log("name change");
    setCopy({ ...copy, name: event.target.value });
  };

  useEffect(() => {
    if (copy.id !== undefined) {
      console.log("updating study", copy);
      dispatch(updateDesignStudy(copy));
    }
  }, [copy]);

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
    // createDesignStudyApi(studyObject)
    //   .unwrap()
    //   .then(() => {})
    //   .then((error) => {});
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

          <input type="text" value={copy.name} onChange={nameChanged} />
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
                  parent_id={copy.id}
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
