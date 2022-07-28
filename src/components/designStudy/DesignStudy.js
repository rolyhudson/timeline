import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

import { MdAddCircleOutline } from "react-icons/md";

import SummaryBar from "./SummaryBar";
import DecisionAnalysis from "../decisionAnalysis/DecisionAnalysis";
import { updateDesignStudy } from "./designStudySlice";

import { useUpdateDesignStudyMutation } from "./designStudyApiSlice";
import { useGetOptionsQuery } from "../option/optionApiSlice";
import { useUpdateDecisionAnalysisMutation } from "../decisionAnalysis/decisionAnalysisApiSlice";

import { genRanHex } from "../GenRanHex";

import "./designStudy.css";

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
  let [childAnalyses, setChildAnalyses] = useState([]); //analyses.filter((s) => s.designstudy_id === props.datamodel.designstudy_id)

  //get options from rtk query
  const { data, isLoading, isSuccess, isError, error } = useGetOptionsQuery();

  //api for analysis
  const [updateDecisionAnalysisApi, response2] =
    useUpdateDecisionAnalysisMutation();

  //on open the model clone the data model that the component represents if valid
  function afterOpenModal() {
    console.log("opening modal", props);
    if (props.state.studyObject.id !== undefined) {
      //clone only once the id is set
      console.log("cloning", props.state.studyObject);
      setCopy({ ...props.state.studyObject });
      //filter the child analyses
      setChildAnalyses(
        analyses.filter((s) => s.designstudy_id === props.state.studyObject.id)
      );
    }
  }

  //change to redux store analyses triggers update to child analyses
  useEffect(() => {
    setChildAnalyses(
      analyses.filter((s) => s.designstudy_id === props.state.studyObject.id)
    );
  }, [analyses]);

  //modal close
  function closeModal() {
    //re filter for changed analyses
    console.log("closing modal", childAnalyses);
    //update in db
    updateChildrenInDB();
    //reset children
    setChildAnalyses([]);
    //change open property
    setIsOpen(false);
    //call close on parent
    props.close();
  }

  //toggle modal open
  useEffect(() => {
    setIsOpen(props.state.open);
  }, [props.state.open]);

  //handle name change on study
  const nameChanged = (event) => {
    //console.log("name change");
    setCopy({ ...copy, name: event.target.value });
  };

  //update to copy triggers update in redux store
  useEffect(() => {
    if (copy.id !== undefined) {
      console.log("updating study");
      dispatch(updateDesignStudy(copy));
    }
  }, [copy]);

  //output child analyses
  useEffect(() => {
    console.log("child analyses", childAnalyses);
  }, [childAnalyses]);

  //update to database on save click
  const [updateDesignStudyApi, response1] = useUpdateDesignStudyMutation();
  const saveStudy = () => {
    console.log("updating on db");
    updateDesignStudyApi(copy);
    console.log(response1);
    updateChildrenInDB();
  };

  const updateChildrenInDB = () => {
    childAnalyses.forEach((element) => {
      console.log("updating", element.name);
      updateDecisionAnalysisApi(element);
      //console.log(response2);
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
          <input type="text" value={copy.name} onChange={nameChanged} />
          <button onClick={closeModal}>close</button>
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
                      element: null,
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
