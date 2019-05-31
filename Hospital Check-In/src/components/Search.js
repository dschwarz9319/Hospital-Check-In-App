import React from "react";
import schema from "../constants/schema";
import entitytitle from "../utils/entitytitle";
import titlecase from "../utils/titlecase";
import Table from "../components/Table";
import catchFetchError from "../utils/catchfetcherror";
import config from "../constants/config";
import removedescriptors from "../utils/removedescriptors";

const Search = () => {
  const filteredSchema = removedescriptors(schema);
  const [table, setTable] = React.useState(Object.keys(filteredSchema)[0]);
  const [column, setColumn] = React.useState(
    Object.keys(Object.values(filteredSchema)[0])[0]
  );
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const changeTable = table => {
    setTable(table);
    setColumn(
      filteredSchema[table] ? Object.keys(filteredSchema[table])[0] : null
    );
  };

  const getResults = () => {
    setResults(null);
    setLoading(true);

    const path = `${config.api.base}/${table}?${column}=${term}`;
    fetch(path)
      .then(catchFetchError)
      .then(r => r.json())
      .then(r => {
        setResults(r);
        setLoading(false);
      })
      .catch(e => {});
  };

  const submitForm = e => {
    getResults();
    e.preventDefault();
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="search-entity">Entity</label>
          <select
            id="search-entity"
            className="form-control"
            value={table}
            onChange={e => changeTable(e.target.value)}
          >
            {Object.keys(filteredSchema).map(table => (
              <option key={table} value={table}>
                {entitytitle(table)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="search-column">Column</label>
          <select
            id="search-column"
            className="form-control"
            value={column}
            onChange={e => setColumn(e.target.value)}
          >
            {Object.keys(filteredSchema[table]).map(col => (
              <option key={col} value={col}>
                {titlecase(col)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="search-value">Search Term</label>
          <input
            type="text"
            id="search-value"
            name="search_val"
            className="form-control"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
      <div className="search-results">
        {loading && <p className="info">Loading...</p>}
        {results && <Table entity={table} data={results} />}
      </div>
    </div>
  );
};

export default Search;
