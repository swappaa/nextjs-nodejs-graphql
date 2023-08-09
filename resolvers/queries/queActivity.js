const { connection } = require("../../db/connection");

module.exports = {
  getActivities(_parent, args) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM activity ORDER BY date_added DESC LIMIT 10",
        (err, results) => {
          if (err) {
            console.error("Error executing the query:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};
