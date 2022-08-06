require("dotenv").config();
import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";

import { COOKIE_NAME, __prod__ } from "./constants";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "./resolvers/user";
import { Context } from "./types/Context";
import { PostResovler } from "./resolvers/post";

const PORT = process.env.PORT || 5555;
const mongoUrl = `mongodb+srv://${process.env.USERNAME_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}@cluster0.d698c.mongodb.net/?retryWrites=true&w=majority`;

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "reddit",
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    logging: true,
    synchronize: true,
    entities: [User, Post],
  });

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  /// Session/Cookie Store

  await mongoose
    .connect(mongoUrl)
    .then(() => console.log("connect success DB"))
    .catch((err) => console.log("error to connect DB " + err));

  app.use(
    session({
      name: COOKIE_NAME,
      store: MongoStore.create({
        mongoUrl,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      secret: process.env.SESSION_SECRET_DEV || "binhdeptroai",
      saveUninitialized: false,
      resave: false,
    })
  );

  const applloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResovler],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }): Context => ({ req, res }),
  });

  await applloServer.start();

  applloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () =>
    console.log(
      `Server started on port ${PORT} Graphql ${applloServer.graphqlPath}`
    )
  );
};

main().catch((err) => console.log(`Error to main : ${err}`));
