const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
const schema = require("./schema.js").schema;
const titlecase = require("./titlecase.js").titlecase;
const NodeRSA = require("node-rsa");
const key = new NodeRSA(
  "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n" +
    "DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n" +
    "VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n" +
    "AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n" +
    "pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n" +
    "QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n" +
    "Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n" +
    "-----END RSA PRIVATE KEY-----"
);

// Read .env file
require("dotenv").config();

const port = 3001;
const app = express();
app.set("port", process.env.port || port);

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
});

db.connect(err => {
  if (err) throw err;

  console.log("Connected to DB");
});
global.db = db;

// allow cors
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const verifyValues = (entity, values) => {
  const cols = schema[entity] || {};
  let hasError = false;
  let errorMessage = "";

  Object.entries(cols).forEach(([key, desc]) => {
    if (!hasError) {
      if (
        desc.required === true &&
        (values[key] == null || values[key] === "")
      ) {
        hasError = true;
        errorMessage = `${titlecase(key)} is required!`;
      }
    }
  });

  return hasError ? errorMessage : null;
};

app.post("/login", (req, res) => {
  const username = String(req.body.username);
  const password = String(req.body.password);

  const query = `SELECT * FROM users WHERE username='${username}' LIMIT 1;`;

  db.query(query, (err, result) => {
    console.log(result);
    if (result && result.length > 0) {
      const user = result[0];
      const decryptedPassword = key.decrypt(user.password, "utf-8");

      if (decryptedPassword === password) {
        const token = key.encrypt(user.id, "base64", "utf-8");

        user.token = token;

        return res.json(user);
      }
    }

    return res.status(422).json({ error: "Incorrect username and password!" });
  });
});

app.get("/me", (req, res) => {
  const token = req.query.token;
  const decryptedToken = key.decrypt(token, "utf8");

  const query = `SELECT * FROM users WHERE id='${decryptedToken}' LIMIT 1;`;

  db.query(query, (err, result) => {
    if (result.length > 0) {
      return res.json(result[0]);
    }

    return res.status("422", { error: "Invalid token" });
  });
});

app.get("/:entity", (req, res) => {
  const entity = req.params.entity;
  const params = req.query;

  const where =
    Object.keys(params).length > 0
      ? " WHERE" +
        Object.entries(params).map(([p, v], i) => {
          return ` ${i > 0 ? "AND " : ""}${p} LIKE '%${v}%'`;
        })
      : "";

  const query = `SELECT * FROM ${entity}${where};`;

  db.query(query, (err, result) => {
    return res.json(result || []);
  });
});

app.get("/:entity/:id", (req, res) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const query = `SELECT * FROM ${entity} WHERE id='${id}' LIMIT 1;`;

  db.query(query, (err, result) => {
    return res.json(result.length ? result[0] : {});
  });
});

app.post("/:entity", (req, res) => {
  const entity = req.params.entity;
  const body = req.body;

  const hasError = verifyValues(entity, body);

  if (hasError) {
    return res.json({ error: hasError });
  }

  const filteredBody = Object.keys(body).reduce((acc, key) => {
    if (body[key] !== "" && body[key] != null) {
      acc[key] = body[key];
    }

    return acc;
  }, {});

  const keys = Object.keys(filteredBody);
  const values = Object.values(filteredBody);

  const query = `INSERT INTO ${entity} (${keys.join(
    ", "
  )}) VALUES ('${values.join("', '")}');`;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    const id = result.insertId;
    const findQuery = `SELECT * FROM ${entity} WHERE id='${id}' LIMIT 1;`;

    db.query(findQuery, (err, result) => {
      return res.json(result.length ? result[0] : {});
    });
  });
});

app.patch("/:entity/:id", (req, res) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const body = req.body;

  const hasError = verifyValues(entity, body);

  if (hasError) {
    return res.json({ error: hasError });
  }

  const filteredBody = body;

  const values = Object.entries(filteredBody)
    .map(([key, val]) => {
      return `${key}='${val}'`;
    })
    .join(", ");

  const query = `UPDATE ${entity} SET ${values} WHERE id='${id}'`;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    const id = result.insertId;
    const findQuery = `SELECT * FROM ${entity} WHERE id='${id}' LIMIT 1;`;

    db.query(findQuery, (err, result) => {
      return res.json(result.length ? result[0] : {});
    });
  });
});

app.delete("/:entity/:id", (req, res) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const query = `DELETE FROM ${entity} WHERE id='${id}';`;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    return res.json({
      success: true
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
