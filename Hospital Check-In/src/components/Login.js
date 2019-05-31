import React from "react";
import config from "../constants/config";

const Login = params => {
  const [token, setToken] = React.useState(localStorage.getItem("USER_TOKEN"));

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitForm = e => {
    const path = `${config.api.base}/login`;

    fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(res => {
      if (res.ok) {
        res.json().then(response => {
          localStorage.setItem("USER_TOKEN", response.token);
          localStorage.setItem("USER", JSON.stringify(response));
          setToken(response.token);
          if ("reloadUser" in params) {
            params.reloadUser();
          }
        });
      } else {
        res
          .clone()
          .json()
          .then(res => {
            alert(res.error || res);
          });
      }
    });

    e.preventDefault();
  };

  if (token) {
    return params.children;
  }

  return (
    <form className="login-form" onSubmit={e => submitForm(e)}>
      <h2>Login</h2>
      <div className="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          className="form-control"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button class="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default Login;
