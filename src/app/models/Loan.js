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
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loan.belongsTo(models.Student, { foreignKey: "studentId" });
      Loan.belongsTo(models.Copy, { foreignKey: "copyId" });
      Loan.belongsTo(models.Period, { foreignKey: "periodId" });
    }
  }
  Loan.init(
    {
      start: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
      },
      end: DataTypes.DATEONLY,
    },
    {
      sequelize,
      underscored: true,
      modelName: "Loan",
    }
  );
  sequelizePaginate.paginate(Loan);
  return Loan;
};
