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

"use strict";
import { Model, Sequelize } from "sequelize";
import { nanoid } from "nanoid";

module.exports = (sequelize, DataTypes) => {
  class Copy extends Model {
    static associate(models) {
      Copy.hasMany(models.Loan, { foreignKey: "copyId" });
      Copy.belongsTo(models.Book, { foreignKey: "bookId" });
      Copy.belongsTo(models.Status, { foreignKey: "statusId" });
    }
  }
  Copy.init(
    {
      code: DataTypes.STRING,
      isLoaned: DataTypes.VIRTUAL(DataTypes.BOOLEAN),
    },
    {
      sequelize,
      modelName: "Copy",
      defaultScope: {
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT CASE WHEN count(*) > 0 THEN true ELSE false END from loans where loans.copy_id = Copy.id and end is null)`
              ),
              "isLoaned",
            ],
          ],
        },
      },
    }
  );

  Copy.beforeCreate(async (copy) => {
    copy.code = nanoid(8);
  });

  return Copy;
};
