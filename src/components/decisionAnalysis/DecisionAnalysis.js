import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import "./decisionAnalysis.css";
import Option from "./Option";
import {
  createDecisionAnalysis,
  updateDecisionAnalysis,
} from "./decisionAnalysisSlice";
import { genRanHex } from "../GenRanHex";

///////////////////////////////////////

export default function DecisionAnalysis(props) {
  const dispatch = useDispatch();
  let [optionsselected, setOptionsSelected] = useState([]);
  let [optionsToPick, setOptionsToPick] = useState([]);
  let [selectedElement, setSelectedElement] = useState(null);

  //set inital copy
  let [copy, setCopy] = useState({ ...props.datamodel });

  //format element list for select drop down
  let elements = props.options.map((option) => ({
    name: option.parentElement,
    label: option.parentElement,
  }));

  //unique element list
  elements = [...new Map(elements.map((item) => [item.name, item])).values()];

  //select element change
  const handleElementChange = (selectedElement) => {
    setSelectedElement(selectedElement);
    setOptionsToPick(
      props.options.filter((option) =>
        option.name.includes(selectedElement.name)
      )
    );
  };

  //copy changed update in store
  useEffect(() => {
    if (copy.designstudy_id !== undefined) {
      console.log("updating analysis", copy);
      dispatch(updateDecisionAnalysis(copy));
    }
  }, [copy]);

  const removeOptionById = (option) => {
    //remove from selected
    setOptionsSelected(
      optionsselected.filter((item) => item.name !== option.name)
    );
    //add to pick list
    setOptionsToPick([...optionsToPick, option]);
  };

  const addOptionById = (option) => {
    setOptionsToPick(optionsToPick.filter((item) => item.name !== option.name));
    setOptionsSelected([...optionsselected, option]);
  };

  const nameChanged = (event) => {
    console.log("name change");
    setCopy({ ...copy, name: event.target.value });
  };

  return (
    <div className="decisionAnalysis">
      <div className="decisionAnalysisHeader">
        <span>
          <b>Decision analysis:</b>
        </span>
        <input type="text" value={copy.name} onChange={nameChanged} />
      </div>

      <div className="flex-parent">
        <div className="flex-child">
          Element:
          <Select
            selectedOption={selectedElement}
            onChange={handleElementChange}
            options={elements}
            getOptionValue={(option) => option.label}
          />
          Options to compare:
          {optionsselected.map((option, index) => {
            return (
              <Option
                key={index}
                option={option}
                removeOption={removeOptionById}
              />
            );
          })}
        </div>
        <div className="flex-child">
          Options:
          {optionsToPick.map((option, index) => {
            return (
              <Option key={index} option={option} addOption={addOptionById} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
