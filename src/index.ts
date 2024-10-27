import express from "express";
import { appoloServer } from "./appoloserver";
import { errorHandler } from "./errorMiddleware";
import 'dotenv/config'


async function start() {
  const app = express();
  try {
    await appoloServer.start();
    appoloServer.applyMiddleware({ app });
    errorHandler(app);
    app.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${appoloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

start();
