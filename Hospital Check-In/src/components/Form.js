import React from "react";
import schema from "../constants/schema";
import titlecase from "../utils/titlecase";
import config from "../constants/config";
import removedescriptors from "../utils/removedescriptors";

const Form = ({ entity, isNew = true, onSubmit, oldValues = {} }) => {
  const elements = removedescriptors(schema)[entity];
  const [columnRows, setColumnRows] = React.useState({});
  const [values, setValues] = React.useState({});

  const setNewValue = (column, val) => {
    setValues(prevState => ({
      ...prevState,
      [column]: val
    }));
  };

  const getRows = entity => {
    const path = `${config.api.base}/${entity}`;
    return fetch(path).then(data => data.json());
  };

  const loadAllRows = () => {
    Object.entries(elements).forEach(([column, type], i) => {
      if (typeof type === "string" && type in schema) {
        getRows(type).then(rows => {
          setColumnRows(prevState => ({
            ...prevState,
            [type]: rows
          }));
        });
      }
    });
  };

  const buildFormElements = () => {
    return Object.entries(elements).map(([column, type], i) => {
      let field = null;

      switch (type) {
        case Number:
          field = (
            <input
              type="number"
              name={column}
              id={column}
              value={values[column]}
              onChange={e => setNewValue(column, e.target.value)}
              className="form-control"
            />
          );
          break;
        case String:
          field = (
            <input
              type="text"
              name={column}
              id={column}
              value={values[column]}
              onChange={e => setNewValue(column, e.target.value)}
              className="form-control"
            />
          );
          break;
        case Date:
          field = (
            <input
              type="date"
              name={column}
              id={column}
              value={values[column]}
              onChange={e => setNewValue(column, e.target.value)}
              className="form-control"
            />
          );
          break;
        default:
          if (typeof type === "string" && type in schema) {
            const rows = type in columnRows ? columnRows[type] : [];

            field = (
              <select
                name={column}
                id={column}
                value={values[column]}
                onChange={e => setNewValue(column, e.target.value)}
                className="form-control"
              >
                <option disabled value="">
                  Select Option
                </option>
                {rows.map((row, i) => {
                  const rowSchema = schema[type];

                  const desc =
                    "_descriptor" in rowSchema
                      ? rowSchema["_descriptor"]
                          .map(item => {
                            return item in row ? row[item] : item;
                          })
                          .join(" ")
                      : null;
                  return (
                    <option key={i} value={row.id}>{`${row.id} ${
                      desc ? ` - ${desc}` : ""
                    }`}</option>
                  );
                })}
              </select>
            );
          }
          break;
      }

      return (
        <div key={i} className="form-group">
          <label htmlFor={column}>{titlecase(column)}</label>
          {field}
        </div>
      );
    });
  };

  React.useEffect(() => {
    const vals = Object.keys(elements).reduce((acc, key) => {
      acc[key] = key in oldValues ? oldValues[key] : "";
      return acc;
    }, {});

    if (!isNew) {
      vals["id"] = oldValues["id"];
    }

    setValues(vals);
    loadAllRows();
  }, [entity, oldValues, isNew]);
  return (
    <form
      className="form entity-edit"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      {buildFormElements()}
      <button className="btn btn-success">{isNew ? "Create" : "Update"}</button>
    </form>
  );
};

export default Form;
