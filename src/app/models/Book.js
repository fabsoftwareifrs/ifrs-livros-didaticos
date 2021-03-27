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
require('dotenv').config()
const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Book.hasMany(models.Copy, { foreignKey: 'bookId' })
    }
  }

  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      volume: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Book',
      underscored: true,
    }
  )
  sequelizePaginate.paginate(Book)
  return Book
}
