import React from "react";
import schema from "../constants/schema";
import { Redirect, Link } from "react-router-dom";
import titlecase from "../utils/titlecase";
import config from "../constants/config";
import entitytitle from "../utils/entitytitle";
import catchFetchError from "../utils/catchfetcherror";
import removedescriptors from "../utils/removedescriptors";

const Row = props => {
  const entity = props.match.params.entity;
  const id = props.match.params.id;

  const [loading, setLoading] = React.useState(true);
  const [row, setRow] = React.useState({});
  const [error, setError] = React.useState(null);

  if (!(entity in schema)) {
    return <Redirect to="/" />;
  }

  React.useEffect(() => {
    setLoading(true);
    setRow({});

    const path = `${config.api.base}/${entity}/${id}`;

    fetch(path)
      .then(catchFetchError)
      .then(r => r.json())
      .then(response => {
        setRow(response);
      })
      .catch(err => {
        setError(`${titlecase(entity)} with ID ${id} not found!`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [entity, id]);

  const filteredSchema = removedescriptors(schema);
  let entitySchema = filteredSchema[entity];

  // Prepend ID to the beginning
  entitySchema = { id: Number, ...entitySchema };

  return (
    <div className="row-page">
      <Link className="back" to={`/entity/${entity}`}>
        &#8592; All {entitytitle(entity)}
      </Link>
      <h2>{`${titlecase(entity)} #${id}`}</h2>
      {!loading ? (
        !error ? (
          Object.entries(entitySchema).map(([key, type], i) => {
            const name = titlecase(key);

            return (
              <p key={i}>
                <strong>{name}: </strong>
                <span>{row[key]}</span>
              </p>
            );
          })
        ) : (
          <p className="alert alert-danger">{error}</p>
        )
      ) : (
        <p className="info">Loading...</p>
      )}
    </div>
  );
};

export default Row;
