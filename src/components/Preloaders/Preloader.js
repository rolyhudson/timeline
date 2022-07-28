import React, { useEffect, useState } from "react";
import DataPreloader from "./DataPreloader";
import { useGetOptionsQuery } from "../designStudy/designStudyApiSlice";
import {
  useGetStudiesQuery,
  useGetPhasesQuery,
  useGetProjectsQuery,
} from "../designStudy/designStudyApiSlice";

export default function Preloader(props) {
  return (
    <div className="datastatus">
      Database status:
      <DataPreloader apiCall={useGetOptionsQuery} name={"options"} />
      <DataPreloader apiCall={useGetStudiesQuery} name={"studies"} />
      <DataPreloader apiCall={useGetProjectsQuery} name={"projects"} />
      <DataPreloader apiCall={useGetPhasesQuery} name={"phases"} />
    </div>
  );
}
