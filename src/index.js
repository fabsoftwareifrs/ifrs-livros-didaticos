/*
 * This file is part of LMS Livros Didáticos.
 *
 * LMS Livros Didáticos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * LMS Livros Didáticos is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>
 */
import express from "express";
import cors from "cors";
import http from "http";
//import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { graphqlUploadExpress } from "graphql-upload";

import typeDefs from "@app/schema";
import resolvers from "@resolvers";
import {
  isAuthenticatedDirectiveTransformer,
  isAuthorizedDirectiveTransformer,
} from "@directives";

import getAuthenticatedUser from "@utils/getAuthenticatedUser";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  //app.use(helmet());
  app.use("/images", express.static(`${__dirname}/../uploads`));
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.get("/", (_, res) => {
    res.send("IFRS API");
  });

  const httpServer = http.createServer(app);

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  schema = isAuthenticatedDirectiveTransformer(schema);
  schema = isAuthorizedDirectiveTransformer(schema);

  const server = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async ({ req }) => {
      if (!req || !req.headers) return null;

      const authorization = req.headers.authorization || "";

      const authenticatedUser = await getAuthenticatedUser(authorization);

      if (!authenticatedUser) return null;

      return { authenticatedUser };
    },
    debug: false,
    formatError: (error) => {
      const e = JSON.stringify(error);
      console.log("Error: " + e);

      return { message: error.message };
    },
  });
  await server.start();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
