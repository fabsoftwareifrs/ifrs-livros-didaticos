'use strict'
const { Model } = require('sequelize')
const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  class Copy extends Model {
    static associate(models) {
      Copy.belongsTo(models.Book, { foreignKey: 'bookId' })
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

  Copy.beforeSave(async (copy) => {
    copy.code = nanoid(8)
  })

  return Copy
}
