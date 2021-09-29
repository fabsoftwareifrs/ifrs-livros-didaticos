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

import fs from "fs";

export default ({ stream, filename, mimetype, types = [] }) => {
  if (!types.includes(mimetype))
    throw new Error("Formato de imagem não permitido!");

  const pathFile = `uploads/${filename}`;

  fs.createWriteStream(pathFile);
  return new Promise((resolve, reject) => {
    stream
      .pipe(fs.createWriteStream(pathFile))
      .on("error", (error) => reject(error))
      .on("finish", () => resolve({ pathFile }));
  });
};
