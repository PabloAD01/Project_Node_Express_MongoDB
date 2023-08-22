import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  
  if (error.status === 404) {
    return <Wrapper>
      <div>
        <img src={img} />
        <h3>Page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/dashboard'>back home</Link>
      </div>
    </Wrapper>
  }
  return (
    <div>
      <h1>Error</h1>
      <Link to="/">Back home</Link>
    </div>
  );
};

export default Error;
