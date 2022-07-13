import React, { useEffect } from "react";
export default function SummaryBar(props) {
  const date = new Date();
  return (
    <div>
      {date.toLocaleDateString()}
      <div>Study scores:</div>
      <ul>
        <ul>Risk</ul>
        <ul>Evidence</ul>
        <ul>Cost</ul>
        <ul>Alignment</ul>
      </ul>
      <div>Participants:</div>
      <ul>
        <ul>Client</ul>
        <ul>Planner X</ul>
        <ul>Planner Y</ul>
      </ul>
    </div>
  );
}
