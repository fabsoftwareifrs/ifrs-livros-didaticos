import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server-express";

function isAuthenticatedDirectiveTransformer(schema) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const isAuthenticatedDirective = getDirective(
				schema,
				fieldConfig,
				"isAuthenticated"
			)?.[0];
			if (isAuthenticatedDirective) {
				const { resolve } = fieldConfig;
				fieldConfig.resolve = async function (source, args, context, info) {
					const { authenticatedUser } = context;
					console.log(authenticatedUser);
					if (authenticatedUser === undefined)
						throw new AuthenticationError("You are not authenticated!");

					return await resolve(source, args, context, info);
				};
				return fieldConfig;
			}
		},
	});
}

export default isAuthenticatedDirectiveTransformer;
