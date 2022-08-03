import React, { useEffect, useState } from "react";
import { useGetOptionsQuery } from "../option/optionApiSlice";

export default function SummaryBar(props) {
  //get options from rtk query
  const { data, isLoading, isSuccess, isError, error } = useGetOptionsQuery();

  let [totalRisk, setTotalRisk] = useState(0);
  let [totalEvidence, setTotalEvidence] = useState(0);
  let [totalCost, setTotalCost] = useState(0);

  const date = new Date();

  console.log("summary", props.childAnalyses);

  useEffect(() => {
    let tR = 0;
    let tE = 0;
    let tC = 0;
    props.childAnalyses.map((analysis) => {
      if (analysis.selectedoption_id !== undefined) {
        let opt = data.find((d) => d.id === analysis.selectedoption_id);
        console.log("selected", opt.scores);
        tC += opt.scores.cost;
        tE += opt.scores.evidence;
        tR += opt.scores.risk;
      }
    });
    setTotalRisk(tR);
    setTotalCost(tC);
    setTotalEvidence(tE);
  }, [props.childAnalyses]);

  return (
    <div>
      {date.toLocaleDateString()}
      <div>Study scores:</div>
      <ul>
        <li>{Math.round(totalRisk * 100) / 100} Risk</li>
        <li>{Math.round(totalEvidence * 100) / 100} Evidence</li>
        <li>{Math.round(totalCost * 100) / 100} Cost</li>
        <li>{null} Alignment</li>
      </ul>
      <div>Participants:</div>
      <ul>
        <li>Client</li>
        <li>Planner X</li>
        <li>Planner Y</li>
        <li>+</li>
      </ul>
    </div>
  );
}
