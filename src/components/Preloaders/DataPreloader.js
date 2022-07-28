import React, { useEffect, useState } from "react";

export default function DataPreloader(props) {
  const { data, isLoading, isSuccess, isError, error } = props.apiGet();
  const [deleteApi, response1] = props.apiDelete();

  const clearDataBase = () => {
    data.map((d) => {
      deleteApi(d);
    });
  };
  let content;

  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div className="datastatus">
        {props.name}
        {error ? (
          <div>Database error</div>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div>loaded: {data.length}</div>
        ) : null}
        {props.allowClear ? (
          <button onClick={clearDataBase}>clear db</button>
        ) : (
          <button disabled>clear db</button>
        )}
      </div>
    </>
  );
}
