/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const {Category} = require('../../models')

let mutations = {
  createCategory: async (_, {nome}) => {
    const category= await Category.create({nome})
    
    return(category)
  },
  updateCategory: async (_, {id,nome}) => {
    const category= await Category.findByPk(id)
    category.update({nome})
    return category 
  },
  deleteCategory: async (_, {id}) => {
    const category= await Category.findByPk(id)
    const {nome}=category
    category.destroy()
    return(true);
  },
}

const modules = [require('./auth')]

modules.forEach((module) => {
  mutations = { ...mutations, ...module }
})

module.exports = { ...mutations }
