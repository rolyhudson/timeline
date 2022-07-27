import React, { useEffect, useState } from "react";
import { useGetOptionsQuery } from "./designStudy/designStudyApiSlice";

export default function OptionsPreloader(props) {
  const { data, isLoading, isSuccess, isError, error } = useGetOptionsQuery();

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
      Database status:
      {error ? (
        <>Database error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div> options loaded: {data.length}</div>
      ) : null}
    </div>
  );
}
