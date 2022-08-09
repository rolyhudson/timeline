import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import "./decisionAnalysis.css";
import Option from "../option/Option";
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

  //set inital copy
  let [copy, setCopy] = useState({ ...props.datamodel });

  //format element list for select drop down
  let elements = props.options.map((option) => ({
    name: option.parentElement,
    label: option.parentElement,
    id: option.id,
  }));

  //unique element list
  elements = [...new Map(elements.map((item) => [item.name, item])).values()];

  //check datamodel
  const isValid = (datamodel) => {
    //TODO validate all properties
    if (datamodel.element) return true;
    else return false;
  };

  //on mount
  useEffect(() => {
    console.log("mounting");
    if (isValid(props.datamodel)) {
      setCopy(props.datamodel);
      let selected = null;
      handleElementChange(props.datamodel.element);
      setOptionsToPick(
        props.options.filter(
          (option) =>
            option.name.includes(props.datamodel.element.name) &&
            !props.datamodel.designoptions_ids.includes(option.id)
        )
      );
      setOptionsSelected(
        props.options.filter((option) =>
          copy.designoptions_ids.includes(option.id)
        )
      );
    }
  }, []);

  //select element change
  const handleElementChange = (selectedElement) => {
    setCopy({ ...copy, element: selectedElement });
    setOptionsToPick(
      props.options.filter((option) =>
        option.name.includes(selectedElement.name)
      )
    );
    setOptionsSelected([]);
  };

  //copy changed update in store
  useEffect(() => {
    if (copy.designstudy_id !== undefined) {
      console.log("updating analysis", copy);
      dispatch(updateDecisionAnalysis(copy));
    }
  }, [copy]);

  //remove from selected list
  const removeOptionById = (option) => {
    //remove from selected
    setOptionsSelected(
      optionsselected.filter((item) => item.name !== option.name)
    );
    //add to pick list
    setOptionsToPick([...optionsToPick, option]);
  };

  useEffect(() => {
    setCopy({ ...copy, designoptions_ids: optionsselected.map((op) => op.id) });
  }, [optionsselected]);

  const addOptionById = (option) => {
    setOptionsToPick(optionsToPick.filter((item) => item.name !== option.name));
    setOptionsSelected([...optionsselected, option]);
  };

  const nameChanged = (event) => {
    console.log("name change");
    setCopy({ ...copy, name: event.target.value });
  };

  const checkChanged = (event) => {
    console.log("check change", event);
    setCopy({ ...copy, selectedoption_id: event.target.id });
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
        <div className="comparelist">
          Filter:
          <Select
            onChange={handleElementChange}
            options={elements}
            getOptionValue={(option) => option.label}
            defaultValue={undefined}
          />
          Options to compare:
          {optionsselected.map((option, index) => {
            return (
              <div className="optionBox">
                <input
                  type="checkbox"
                  id={option.id}
                  key={option.id}
                  onClick={checkChanged}
                  checked={option.id === copy.selectedoption_id}
                ></input>

                <Option
                  key={index}
                  option={option}
                  removeOption={removeOptionById}
                />
              </div>
            );
          })}
        </div>
        <div className="picklist">
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
