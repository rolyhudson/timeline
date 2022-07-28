import React, { useEffect, useState } from "react";
import DataPreloader from "./DataPreloader";
import {
  useGetOptionsQuery,
  useDeleteOptionMutation,
} from "../option/optionApiSlice";
import {
  useGetStudiesQuery,
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
  return (
    <>
      <div className="datastatus">
        Database status:
        <DataPreloader
          apiGet={useGetOptionsQuery}
          apiDelete={useDeleteOptionMutation}
          name={"options"}
          allowClear={false}
        />
        <DataPreloader
          apiGet={useGetProjectsQuery}
          apiDelete={useDeleteProjectMutation}
          name={"projects"}
          allowClear={true}
        />
        <DataPreloader
          apiGet={useGetPhasesQuery}
          apiDelete={useDeletePhaseMutation}
          name={"phases"}
          allowClear={true}
        />
        <DataPreloader
          apiGet={useGetStudiesQuery}
          apiDelete={useDeleteDesignStudyMutation}
          name={"studies"}
          allowClear={true}
        />
        <DataPreloader
          apiGet={useGetDecisionAnalysesQuery}
          apiDelete={useDeleteDecisionAnalysisMutation}
          name={"analyses"}
          allowClear={true}
        />
      </div>
    </>
  );
}
