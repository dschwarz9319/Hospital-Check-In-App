import React from "react";
import titlecase from "../utils/titlecase";
import actions from "../constants/actions";
import { Redirect } from "react-router-dom";

const Action = props => {
  const action = props.match.params.action;

  if (!(action in actions)) {
    return <Redirect to="/" />;
  }

  const actionSchema = actions[action];
  const ActionComponent = actionSchema.component;

  return (
    <>
      <h2>{titlecase(action)}</h2>
      {ActionComponent && <ActionComponent />}
    </>
  );
};

export default Action;
