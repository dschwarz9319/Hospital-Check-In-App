import React from "react";
import entitytile from "../utils/entitytitle";
import config from "../constants/config";
import schema from "../constants/schema";
import { Redirect, Link } from "react-router-dom";
import Table from "./Table";

const Entity = props => {
  const entity = props.match.params.entity;

  if (!(entity in schema)) {
    return <Redirect to="/" />;
  }

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadData = () => {
    setLoading(true);

    const path = `${config.api.base}/${entity}`;
    fetch(path)
      .then(data => data.json())
      .then(response => {
        setData(response);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadData();
  }, [entity]);

  return (
    <div className="entity">
      <div className="entity-header">
        <h2>{entitytile(entity)}</h2>
        <Link to={`/entity/${entity}/new`} className="btn btn-sm btn-success">
          + New
        </Link>
      </div>
      {loading ? (
        <p className="info">Loading...</p>
      ) : data.length ? (
        <Table entity={entity} data={data} reloadData={loadData} />
      ) : (
        <p className="info">No Results</p>
      )}
    </div>
  );
};

export default Entity;
