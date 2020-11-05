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

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loan.hasOne(models.Student, { foreignKey: 'studentId', as: 'student' })
      Loan.hasOne(models.Book, { foreignKey: 'bookId', as: 'book' })
      Loan.hasOne(models.User, { foreignKey: 'userId', as: 'user' })
    }
  };
  Loan.init({
    withdrawDate: DataTypes.DATEONLY,
    loanDays: DataTypes.INTEGER,
    delivered: DataTypes.BOOLEAN,
    deliveredDate: DataTypes.DATEONLY,
    studentId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Loan',
  });
  return Loan;
};