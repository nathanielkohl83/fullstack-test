const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

////////////
// ROUTES //
////////////
// CREATE a user
app.post("/persons", async (req, res) => {
  try {
    const { first_name, last_name, age, email } = req.body;
    const newPerson = await pool.query(
      "INSERT INTO PERSON(FIRST_NAME, LAST_NAME, EMAIL) VALUES($1, $2, $3)",
      [first_name, last_name, email]
    );

    res.json(newPerson);
  } catch (err) {
    console.error(err.message);
  }
});

// GET all users

// GET a user

// UPDATE a user

// DELETE a user

app.listen(5000, () => {
  console.log("server has started on port 5000.");
});
