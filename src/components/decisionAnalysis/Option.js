import React from "react";
import "./decisionAnalysis.css";

export default function Option(props) {
  let buttonAction = props.removeOption;
  let plusminus = "-";
  if (buttonAction == null) {
    buttonAction = props.addOption;
    plusminus = "+";
  }

  return (
    <div className="optionBox">
      <div className="optionheader">
        <div className="optionfragment">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => buttonAction(props.option)}
          >
            {plusminus}
          </button>
        </div>
        <div className="optionfragment">
          <b>{props.option.name}</b>
        </div>
        <div className="optionfragment">
          {" "}
          compositeScore:
          {Math.round(props.option.scores.compositeScore * 100) / 100}
        </div>
      </div>
      <div className="optionscores">
        <div className="optionfragment">
          {" "}
          cost:{Math.round(props.option.scores.cost * 100) / 100}
        </div>
        <div className="optionfragment">
          {" "}
          risk:{Math.round(props.option.scores.risk * 100) / 100}
        </div>
        <div className="optionfragment">
          {" "}
          evidence:{Math.round(props.option.scores.evidence * 100) / 100}
        </div>
      </div>
    </div>
  );
}
