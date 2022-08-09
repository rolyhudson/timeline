import React from "react";
import "../decisionAnalysis/decisionAnalysis.css";
import { FaBeer } from "react-icons/fa";
import * as icons from "react-icons/fa";

export default function Option(props) {
  let buttonAction = props.removeOption;
  let plusminus = "-";
  if (buttonAction == null) {
    buttonAction = props.addOption;
    plusminus = "+";
  }

  var Components = Object.entries(icons);
  const randomIcon = () => {
    var keys = Object.keys(icons);
    let icon = Math.floor(props.option.scores.cost * 1610);
    return React.createElement(Components[icon][1]);
  };

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

        {/* include detail only in compare list*/}
        {props.removeOption ? (
          <div className="optionfragment">
            {" "}
            compositeScore:
            {Math.round(props.option.scores.compositeScore * 100) / 100}
          </div>
        ) : (
          <h1>{randomIcon()}</h1>
        )}
      </div>
      {/* include detail only in compare list*/}
      {props.removeOption ? (
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
      ) : (
        ""
      )}
    </div>
  );
}
