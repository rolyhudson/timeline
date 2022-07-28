import React, { useEffect, useState } from "react";
import { useGetOptionsQuery } from "../designStudy/designStudyApiSlice";

export default function DataPreloader(props) {
  const { data, isLoading, isSuccess, isError, error } = props.apiCall();

  let content;

  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="datastatus">
      {props.name}
      {error ? (
        <div>Database error</div>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div>loaded: {data.length}</div>
      ) : null}
    </div>
  );
}
