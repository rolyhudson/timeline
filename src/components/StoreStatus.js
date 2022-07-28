import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function StoreStatus(props) {
  let analyses = useSelector((state) => state.decisionAnalysis.value);
  let studies = useSelector((state) => state.designStudy.value);
  return (
    <div className="datastatus">
      Store status:
      <div className="datastatus">Studies: {studies.length}</div>
      <div className="datastatus">Analyses: {analyses.length}</div>
    </div>
  );
}
