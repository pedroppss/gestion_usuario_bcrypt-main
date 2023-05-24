const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456789",
  database: "user",
  dialect: "postgres",
  port: 5432,
});

async function isAuthtoken(req, res, next) {
  try {
    const token = req.params.token;
    const password = await bcrypt.hash(req.body.password, 10);
    if (token) {
      jwt.verify(token, process.env.secretKey, function (err, payload) {
        if (payload.name == req.body.name || payload.email == req.body.email) {
          const response = pool.query(`UPDATE users SET password='${password}' WHERE name='${req.body.name}'`);
          const result = response.rows
          next()
          res.status(200).json({ success: true, message: " password updated succesfully" })
        } else {
          res.status(409).json({ success: false, error: err });
        }
      })
    } else if (!token) {
      res.status(401).json({ message: "Token not found" })
    }
  } catch (err) {
    res.status(401).json({ status: "fail", message: "Invalid Token,not Authorized" });
  }
}
module.exports = isAuthtoken;

