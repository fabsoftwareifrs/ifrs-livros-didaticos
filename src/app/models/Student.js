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

'use strict'
const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Course, { foreignKey: 'courseId' })
      Student.belongsTo(models.Classes, { foreignKey: 'classId' })
      Student.hasMany(models.Loan, { foreignKey: 'studentId' })
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      matriculation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  )
  sequelizePaginate.paginate(Student)
  return Student
}
