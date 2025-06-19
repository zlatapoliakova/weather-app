import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";

const setContent = (process, Component, data = null) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;