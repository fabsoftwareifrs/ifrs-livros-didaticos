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

// function isAuthorizedDirective(directiveName) {
// 	return {
// 		isAuthorizedDirectiveTypeDefs: `
// 			directive @${directiveName}(roles:[String!]) on FIELD_DEFINITION
// 		`,
// 		isAuthorizedDirectiveTransformer,
// 	};
// }

// class IsAuthorizedDirective extends SchemaDirectiveVisitor {
// 	visitFieldDefinition(field) {
// 		const { resolve = defaultFieldResolver } = field;
// 		const { roles } = this.args;

// 		field.resolve = async function (...args) {
// 			const [, , { authenticatedUser }] = args;

// 			if (authenticatedUser === undefined)
// 				throw new AuthenticationError("You are not authenticated!");

// 			//console.log("Role: ", authenticatedUser);
// 			if (!roles.includes(authenticatedUser.role)) {
// 				throw new AuthenticationError("You are not authorized!");
// 			}

// 			const result = await resolve.apply(this, args);

// 			return result;
// 		};
// 	}
// }

export default isAuthorizedDirectiveTransformer;
