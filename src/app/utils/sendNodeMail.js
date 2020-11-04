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

require("dotenv").config({
	path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env",
});
const nodemailer = require("nodemailer");
const logoIFRSBG = require("../../assets/ifrsbg.png");

const sendNodeMail = async ({
	from,
	to,
	subject,
	text,
	html,
	attachments = [],
}) => {
	try {
		if (!from) throw new Error("E-mail de envio não foi informado!");
		if (!to) throw new Error("E-mail de destino não foi informado!");

		let transport = nodemailer.createTransport({
			service: process.env.EMAIL_SERVICE,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const defaultAttachments = [
			{
				filename: "ifrsbg.png",
				path: `${__dirname}/${logoIFRSBG.default}`,
				cid: "ifrsbg@maisbento.com",
			},
			...attachments,
		];
		
		const message = {
			replyTo: "noreply@google.com",
			from,
			to,
			subject,
			text,
			html,
			attachments: html ? defaultAttachments : null,
		};

		transport.sendMail(message, function (err, info) {
			if (err) throw new Error("Problemas no envio de email!");
		});

		return {
			success: true,
			message: `Email enviado com sucesso!`,
		};
	} catch (e) {
		return {
			success: false,
			message: e.message,
		};
	}
};

module.exports = sendNodeMail;
