import React from "react";
import schema from "../constants/schema";
import { Redirect, Link } from "react-router-dom";
import config from "../constants/config";
import entitytitle from "../utils/entitytitle";
import titlecase from "../utils/titlecase";
import Form from "./Form";
import catchfetcherror from "../utils/catchfetcherror";

const NewRow = props => {
  const newModel = "new" in props ? props.new : true;
  const entity = props.match.params.entity;
  const id = props.match.params.id;
  const [saved, setSaved] = React.useState(false);
  const [oldValues, setOldValues] = React.useState({});

  if (!(entity in schema) && !id) {
    return <Redirect to="/" />;
  }

  React.useState(() => {
    setOldValues({});
    if (newModel === false && id) {
      // load current values
      const path = `${config.api.base}/${entity}/${id}`;

      fetch(path)
        .then(catchfetcherror)
        .then(r => r.json())
        .then(response => {
          setOldValues(response);
        })
        .catch(err => {
          alert(`${titlecase(entity)} with ID ${id} not found!`);
        });
    }
  }, [newModel, entity, id]);

  const submitForm = values => {
    const path = newModel
      ? `${config.api.base}/${entity}`
      : `${config.api.base}/${entity}/${id}`;

    fetch(path, {
      method: newModel ? "POST" : "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => {
      if (!res.ok) {
        res
          .clone()
          .json()
          .then(err => {
            alert(err.sqlMessage || "Unknown error.");
          });
      } else {
        res.json().then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            const msg = newModel
              ? `New ${titlecase(entity)} created.`
              : `${titlecase(entity)} #${id} updated.`;
            alert(msg);
            setSaved(true);
          }
        });
      }
    });
  };

  if (saved) {
    return <Redirect to={`/entity/${entity}`} />;
  }

  return (
    <div className="entity-new row-page">
      <Link className="back" to={`/entity/${entity}`}>
        &#8592; All {entitytitle(entity)}
      </Link>
      <h2>
        {newModel ? "New" : "Edit"} {titlecase(entity)}
      </h2>
      <Form
        entity={entity}
        oldValues={oldValues}
        isNew={newModel}
        onSubmit={submitForm}
      />
    </div>
  );
};

export default NewRow;
