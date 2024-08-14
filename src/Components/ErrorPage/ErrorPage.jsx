import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let errorText = "";
  if (error) {
    if (error.status && error.statusText) {
      errorText = `${error.status}: ${error.statusText}`;
    } else {
      errorText = `${error}`;
    }
  }

  console.error(error);
  return <div data-testid="error">{errorText}</div>;
};

export default ErrorPage;
