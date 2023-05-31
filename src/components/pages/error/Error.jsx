import scss from "./Error.module.scss";
import { useLocation } from "react-router-dom";

const Error = () => {
  const errlocation = useLocation();

  return (
    <>
      <div className={scss.page}>
        <img
          className={scss.img}
          src="https://images.ctfassets.net/ooa29xqb8tix/3z06UNk6wzqKRAUHIGGqNq/b645540f93c695f6bb9b95c076582e57/UI_Design_400x300_-_1.svg"
          alt="img"
        />
        <h3 className={scss.title}>
          404 <br />
          <span>
            Nothing was found by the query: {errlocation.pathname.split("/")}
          </span>
        </h3>
      </div>
    </>
  );
};

export default Error;
