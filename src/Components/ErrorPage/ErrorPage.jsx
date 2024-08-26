import styles from "./ErrorPage.module.css";
import { Link, useRouteError } from "react-router-dom";

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
  return (
    <div className={styles.wrapper}>
      <p data-testid="error" className={styles.error}>
        {errorText}
      </p>
      <Link to="/" className={styles.link}>
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
