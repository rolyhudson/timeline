import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeDesignStudy } from "./designStudy/designStudySlice";
import { removeDecisionAnalysis } from "./decisionAnalysis/decisionAnalysisSlice";
import { useDeleteDesignStudyMutation } from "./designStudy/designStudyApiSlice";
export default function StoreStatus(props) {
  let analyses = useSelector((state) => state.decisionAnalysis.value);
  let studies = useSelector((state) => state.designStudy.value);
  let dispatch = useDispatch();

  const [deleteDesignStudyApi, response1] = useDeleteDesignStudyMutation();
  const clearDataBase = () => {
    studies.map((s) => {
      deleteDesignStudyApi(s);
    });
  };

  const clearStore = () => {
    studies.map((s) => {
      dispatch(removeDesignStudy(s));
    });

    analyses.map((s) => {
      dispatch(removeDecisionAnalysis(s));
    });
  };
  return (
    <>
      <div className="datastatus">
        Store status:
        <div className="datastatus">Studies: {studies.length}</div>
        <div className="datastatus">Analyses: {analyses.length}</div>
      </div>
      <div>
        <button onClick={clearStore}>clear store</button>
      </div>
    </>
  );
}
