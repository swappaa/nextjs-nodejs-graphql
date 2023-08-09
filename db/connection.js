const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "23.92.68.66",
  user: "glcsyste_estore",
  password: "3st0r32022!",
  database: "glcsyste_estore",
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { connection, connectToDatabase };
