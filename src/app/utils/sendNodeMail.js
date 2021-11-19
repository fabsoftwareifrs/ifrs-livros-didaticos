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

import nodemailer from "nodemailer";
import logoIFRSBG from "@assets/ifrsbg.png";

const sendNodeMail = async ({
  from,
  to,
  subject,
  text,
  html,
  attachments = [],
}) => {
  return new Promise((resolve, reject) => {
    if (!from) resolve(false);
    if (!to) resolve(false);

    let transport = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: 465,
      secure: true, // use SSL
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
        path: `${__dirname}/${logoIFRSBG}`,
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
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export default sendNodeMail;
