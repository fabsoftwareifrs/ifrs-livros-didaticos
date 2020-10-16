/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict'
require('dotenv').config()

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      nome: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )



  return Category
}
