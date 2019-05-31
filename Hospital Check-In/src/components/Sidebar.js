import React from "react";
import schema from "../constants/schema";
import actions from "../constants/actions";
import entitytitle from "../utils/entitytitle";
import { Link } from "react-router-dom";

const ListActions = () => {
  return Object.entries(actions).map(([key, action], i) => {
    return (
      <li key={`action-item-${i}`}>
        <Link to={"link" in action ? action.link : `/action/${key}`}>
          {action.name}
        </Link>
      </li>
    );
  });
};

const ListEntites = () => {
  return Object.keys(schema).map((table, i) => {
    return (
      <li key={`sidebar-item-${i}`}>
        <Link to={`/entity/${table}`}>{entitytitle(table)}</Link>
      </li>
    );
  });
};

const Sidebar = () => {
  const entities = ListEntites();
  const actions = ListActions();

  return (
    <>
      <div className="sidebar__list">
        <h3>Main Actions</h3>
        <ul>{actions}</ul>
      </div>
      <div className="sidebar__list">
        <h3>Reports</h3>
        <ul>{entities}</ul>
      </div>
    </>
  );
};

export default Sidebar;
