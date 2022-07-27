import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function StoreStatus(props) {
  let analyses = useSelector((state) => state.decisionAnalysis.value);
  let studies = useSelector((state) => state.designStudy.value);
  return (
    <div className="datastatus">
      Store status:
      <div>Studies: {studies.length}</div>
      <div>Analyses: {analyses.length}</div>
    </div>
  );
}
