const getToken = (authorization) => {
	if (!authorization) return authorization;

	const parts = authorization.split(" ");
	if (parts.length !== 2) throw new Error("Token Error.");

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) throw new Error("Token Mal formatted.");

	return token;
};

module.exports = getToken