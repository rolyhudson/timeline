import {
  useGetOptionsQuery,
  useCreateProjectMutation,
  useCreateDesignStudyMutation,
} from "./designStudyApiSlice";

export const useGetOptions = () => {
  const {
    data: options,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOptionsQuery();

  let content;

  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = options;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return { data: options, isLoading: isLoading, isSuccess: isSuccess };
};

export const useSaveStudy = (studyObject) => {
  const [createDesignStudyApi, response1] = useCreateDesignStudyMutation();

  createDesignStudyApi(studyObject)
    .unwrap()
    .then((fulfilled) => console.log(fulfilled))
    .catch((rejected) => console.error(rejected));
  return "some result";
};
