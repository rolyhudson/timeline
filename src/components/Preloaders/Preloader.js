import React, { useEffect, useState } from "react";
import DataPreloader from "./DataPreloader";
import {
  useGetOptionsQuery,
  useDeleteOptionMutation,
} from "../option/optionApiSlice";
import {
  useGetStudiesQuery,
  useLazyGetStudiesQuery,
  useDeleteDesignStudyMutation,
} from "../designStudy/designStudyApiSlice";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../project/projectApiSlice";
import {
  useGetPhasesQuery,
  useDeletePhaseMutation,
} from "../phase/phaseApiSlice";
import {
  useGetDecisionAnalysesQuery,
  useDeleteDecisionAnalysisMutation,
} from "../decisionAnalysis/decisionAnalysisApiSlice";

export default function Preloader(props) {
  const reloadDataBase = () => {};
  const [update, setUpate] = useState(false);
  return (
    <>
      <div className="datastatus">
        Database status:
        <button onClick={reloadDataBase}>reload db</button>
        {/* <DataPreloader
          apiGet={useGetOptionsQuery}
          apiDelete={useDeleteOptionMutation}
          name={"options"}
          allowClear={false}
          update={update}
          apiLazyGet={useLazyGetStudiesQuery}
        />
        <DataPreloader
          apiGet={useGetProjectsQuery}
          apiDelete={useDeleteProjectMutation}
          name={"projects"}
          allowClear={true}
          update={update}
          apiLazyGet={useLazyGetStudiesQuery}
        />
        <DataPreloader
          apiGet={useGetPhasesQuery}
          apiDelete={useDeletePhaseMutation}
          name={"phases"}
          allowClear={true}
          update={update}
          apiLazyGet={useLazyGetStudiesQuery}
        /> */}
        <DataPreloader
          apiGet={useGetStudiesQuery}
          apiDelete={useDeleteDesignStudyMutation}
          name={"studies"}
          allowClear={true}
          update={update}
          apiLazyGet={useLazyGetStudiesQuery}
        />
        {/* <DataPreloader
          apiGet={useGetDecisionAnalysesQuery}
          apiDelete={useDeleteDecisionAnalysisMutation}
          name={"analyses"}
          allowClear={true}
          update={update}
          apiLazyGet={useLazyGetStudiesQuery}
        /> */}
      </div>
    </>
  );
}
