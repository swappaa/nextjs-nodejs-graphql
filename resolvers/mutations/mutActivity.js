const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub(); // Publish and Subscribe, Publish -> everyone gets to hear it

const { connection } = require("../../db/connection");
const { promisify } = require("util");

module.exports = {
  createActivity: async (_parent, args) => {
    try {
      // Convert the connection.query function to a promise-based function
      const queryAsync = promisify(connection.query).bind(connection);

      // Execute the database query using await
      const result = await queryAsync("INSERT INTO activity SET ?", args);

      // Extract the newly inserted activity_id from the result
      const newActivity = { ...args, activity_id: result.insertId };
      console.log("Newly inserted activity:", newActivity);

      // Publish the `ACTIVITY_CREATED` event with the new activity data
      pubsub.publish("ACTIVITY_CREATED", { onCreateActivity: newActivity });

      return newActivity;
    } catch (err) {
      console.error("Error executing the query:", err);
      throw err;
    }
  },
};
