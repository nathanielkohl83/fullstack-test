// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// // middleware
// app.use(cors());
// app.use(express.json());

// ////////////
// // ROUTES //
// ////////////
// // CREATE a user
// app.post("/persons", async (req, res) => {
//   try {
//     const { first_name, last_name, age, email } = req.body;
//     const newPerson = await pool.query(
//       "INSERT INTO PERSON(FIRST_NAME, LAST_NAME, EMAIL) VALUES($1, $2, $3)",
//       [first_name, last_name, email]
//     );

//     res.json(newPerson);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // GET all users
// app.get("/hello", async (req, res) => {
//   res.send("Hello there!");
// });

// // GET a user

// // UPDATE a user

// // DELETE a user

// app.listen(5000, () => {
//   console.log("server has started on port 5000.");
// });

const express = require("express");
const morgan = require("morgan");

const db = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
  const users = await db.select().from("users");
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await db("users").insert({ name: req.body.name }).returning("*");
  res.json(user);
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
