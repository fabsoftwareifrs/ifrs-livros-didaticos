import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server-express";

function isAuthorizedDirectiveTransformer(schema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthorizedDirective = getDirective(
        schema,
        fieldConfig,
        "isAuthorized"
      )?.[0];
      if (isAuthorizedDirective) {
        const { resolve } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const { authenticatedUser } = context;
          const { roles } = isAuthorizedDirective;
          console.log(authenticatedUser);
          console.log(roles);
          if (authenticatedUser === undefined)
            throw new AuthenticationError("You are not authenticated!");

          if (!roles.includes(authenticatedUser.accessLevel))
            throw new AuthenticationError("You are not authorized!");

          return await resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
}

export default isAuthorizedDirectiveTransformer;
