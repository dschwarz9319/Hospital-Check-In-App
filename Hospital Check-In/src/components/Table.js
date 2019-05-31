import React from "react";
import DataTable from "react-data-table-component";
import schema from "../constants/schema";
import titlecase from "../utils/titlecase";
import removedescriptors from "../utils/removedescriptors";
import { Link } from "react-router-dom";
import config from "../constants/config";

const Table = ({ entity = "", data = [], reloadData = () => {} }) => {
  const filteredSchema = removedescriptors(schema);
  const tableSchema = filteredSchema[entity];

  if (!tableSchema) {
    return null;
  }

  const deleteRow = (entity, id) => {
    const path = `${config.api.base}/${entity}/${id}`;
    const referencedEntities = Object.keys(schema).filter(e => {
      return (
        Object.keys(schema[e]).filter(c => c === `${entity}_id`).length > 0
      );
    });
    let confirmed = true;

    if (referencedEntities.length > 0) {
      confirmed = window.confirm(
        "All entities that reference this row will also be deleted."
      );
    }

    if (confirmed) {
      fetch(path, {
        method: "DELETE"
      }).then(res => {
        if (res.ok) {
          reloadData();
        } else {
          res
            .clone()
            .json()
            .then(err => {
              alert(err.sqlMessage || "Unknown error.");
            });
        }
      });
    }
  };

  let columns = Object.entries(tableSchema).map(([name, type]) => {
    return {
      name: titlecase(name),
      selector: name,
      sortable: true,
      ignoreRowClick: true,
      cell: row => {
        if (typeof type === "string") {
          const absoluteType = type.replace("_id", "");

          return (
            <Link to={`/entity/${absoluteType}/${row[name]}`}>{row[name]}</Link>
          );
        }

        return row[name];
      }
    };
  });

  columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      ignoreRowClick: true,
      cell: row => {
        return <Link to={`/entity/${entity}/${row.id}`}>{row.id}</Link>;
      }
    },
    ...columns,
    {
      name: "Actions",
      sortable: false,
      ignoreRowClick: true,
      cell: row => {
        return (
          <div>
            <Link to={`/entity/${entity}/${row.id}/edit`}>Edit</Link>
            <span> | </span>
            <a
              href="#"
              role="button"
              onClick={e => {
                e.preventDefault();
                deleteRow(entity, row.id);
              }}
            >
              Delete
            </a>
          </div>
        );
      }
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      noHeader={true}
      pagination={true}
    />
  );
};

export default Table;
