import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) =>
  history.length > 1 && (
    <button onClick={history.goBack}>Register</button>

  );

export default withRouter(Back);
