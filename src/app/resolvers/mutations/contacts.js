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

const sendNodeMail = require("../../utils/sendNodeMail");
const template = require("../../templates/email");

const sendMessage = async (_,  input ) => {
	const mailtext = `Mensagem de teste`;
	const mailhmtl = `<p><b>Mensagem de teste</b></p>`;

	const mailMessage = {
		from: input.from,
		to: "edufaggion@gmail.com",
		subject: "Mensagem de teste",
		text: mailtext,
		html: template(mailhmtl),
	};

	const mail= await sendNodeMail(mailMessage);
	return mail.success;
};

module.exports = { sendMessage };
