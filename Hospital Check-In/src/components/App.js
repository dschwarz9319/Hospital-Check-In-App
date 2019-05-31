import React from "react";
import { Navbar, Container } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Entity from "./Entity";
import Row from "./Row";
import Action from "./Action";
import EditRow from "./EditRow";
import Login from "./Login";

// Global app syles
import "../styles/app.scss";

const App = () => {
  const [user, setUser] = React.useState(null);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const loadUser = () => {
    setUser(localStorage.getItem("USER"));
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Navbar expand="md" className="header">
        <Container>
          <h1>
            <Link to="/">
              GO <span>HEALTH</span>
            </Link>
          </h1>
          {user && (
            <div className="welcome-block">
              <span className="welcome">
                Welcome, {JSON.parse(user).username}
              </span>
              <button className="btn btn-link" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </Container>
      </Navbar>
      <Container className="app-container">
        <Login reloadUser={loadUser}>
          <div className="sidebar">
            <Sidebar />
          </div>
          <main className="main">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/entity/:entity" exact component={Entity} />
              <Route
                path="/entity/:entity/new"
                exact
                component={props => <EditRow {...props} new={true} />}
              />
              <Route path="/entity/:entity/:id" exact component={Row} />
              <Route
                path="/entity/:entity/:id/edit"
                exact
                component={props => <EditRow {...props} new={false} />}
              />
              <Route path="/action/:action" component={Action} />
            </Switch>
          </main>
        </Login>
      </Container>
    </Router>
  );
};

export default App;
