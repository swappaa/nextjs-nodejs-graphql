const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub(); // Create an instance of the PubSub class

module.exports = {
  onCreateActivity: {
    // The `subscribe` function is responsible for returning an AsyncIterator
    // that emits the payloads to the subscribers when an event occurs.
    subscribe: () => pubsub.asyncIterator("ACTIVITY_CREATED"),
    // resolve: (payload) => {
    //   // This resolver function is responsible for transforming the data
    //   // before sending it to the client. You can modify the payload here
    //   // if necessary.

    //   // Log the payload for debugging purposes
    //   console.log("Payload received by subscribers:", payload);

    //   // Return the payload data (in this case, it is the `onCreateActivity` field)
    //   return payload.onCreateActivity;
    // },
  },
};
