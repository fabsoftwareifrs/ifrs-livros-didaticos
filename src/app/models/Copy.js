'use strict'
const { Model } = require('sequelize')
const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  class Copy extends Model {
    static associate(models) {
      Copy.belongsTo(models.Book, { foreignKey: 'bookId' })
      Copy.hasOne(models.Loan, { foreignKey: 'copyId' })
    }
  }
  Copy.init(
    {
      code: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Copy',
    }
  )

  Copy.beforeCreate(async (copy) => {
    copy.code = nanoid(8)
  })

  return Copy
}
