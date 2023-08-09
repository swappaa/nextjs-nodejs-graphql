import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";

import { typeDefs } from "./schema/typeDefs";
const resolvers = require("./resolvers");

const { connectToDatabase } = require("./db/connection");

// Asnychronous Anonymous Function
// Inside of server.ts -> await keyword

(async function () {
  // Connect to the database
  try {
    await connectToDatabase();
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application if the database connection fails
  }

  // Server code in here!
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // ws Server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql", // localhost:4000/graphql
  });

  const serverCleanup = useServer({ schema, execute, subscribe }, wsServer); // dispose

  // apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // start our server
  await server.start();

  // apply middlewares (cors, expressmiddlewares)
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  // http server start
  httpServer.listen(4000, () => {
    console.log("Server running on http://localhost:" + "4000" + "/graphql");
  });
})();
