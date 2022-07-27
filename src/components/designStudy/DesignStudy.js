import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { updateDesignStudy } from "./designStudySlice";
import { MdAddCircleOutline } from "react-icons/md";

import "./designStudy.css";
import SummaryBar from "./SummaryBar";
import DecisionAnalysis from "../decisionAnalysis/DecisionAnalysis";
import {
  useGetOptionsQuery,
  useUpdateDesignStudyMutation,
  useCreateDesignStudyMutation,
} from "./designStudyApiSlice";

import { genRanHex } from "../GenRanHex";
///////////////////////
//Component
export default function DesignStudy(props) {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");

  //initial clone of data model
  let [copy, setCopy] = useState({ ...props.state.studyObject });

  //get all children (analyses) could also come via rtk query
  let analyses = useSelector((state) => state.decisionAnalysis.value);

  //filter for those related to this parent (study)
  let [childAnalyses, setChildAnalyses] = useState(
    analyses.filter((s) => s.designstudy_id === props.datamodel.designstudy_id)
  );

  //get options from rtk query
  const { data, isLoading, isSuccess, isError, error } = useGetOptionsQuery();

  //on open the model clone the data model that the component represents if valid
  function afterOpenModal() {
    if (props.state.studyObject.id !== undefined) {
      //clone only once the id is set
      console.log("cloning", props.state.studyObject.id);
      setCopy({ ...props.state.studyObject });
    }
  }

  //modal close
  function closeModal() {
    setIsOpen(false);
  }

  //toggle modal open
  useEffect(() => {
    setIsOpen(props.state.open);
  }, [props.state.open]);

  //handle name change on study
  const nameChanged = (event) => {
    console.log("name change");
    setCopy({ ...copy, name: event.target.value });
  };

  //update to copy triggers update in redux store
  useEffect(() => {
    if (copy.id !== undefined) {
      console.log("updating study", copy);
      dispatch(updateDesignStudy(copy));
    }
  }, [copy]);

  //update to database on save click
  const [updateDesignStudyApi, response1] = useUpdateDesignStudyMutation();
  const saveStudy = () => {
    console.log("updating on db");
    updateDesignStudyApi(copy);
    console.log(response1);
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
            {data ? (
              childAnalyses.map((decisionAnalysis, i) => {
                return (
                  <DecisionAnalysis
                    key={i}
                    options={data}
                    datamodel={decisionAnalysis}
                  />
                );
              })
            ) : (
              <div> loading</div>
            )}
            <span className="tooltip">
              <MdAddCircleOutline
                onClick={() =>
                  setChildAnalyses([
                    ...childAnalyses,
                    {
                      name: "new analysis",
                      id: genRanHex(24),
                      designstudy_id: copy.id,
                    },
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
