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

const { Loan } = require("@models")
const paginateLoans= async (_,{page,limit}) => {
    const options = {
        page, // Default 
        paginate: limit, // Default 25
        include:[{association: 'students' },{association: 'books' },{association: 'users' },{association: 'periods' }]
    }
    const loan= await Loan.paginate(options)
    return(loan)
}
    const loans= ()=> Loan.findAll({include:[{association: 'students' },{association: 'books' },{association: 'users' },{association: 'periods' }]})
    const loan= (_, {id}) => Loan.findByPk(id,{include:[{association: 'students' },{association: 'books' },{association: 'users' },{association: 'periods' }]})


module.exports =  {loan, loans,paginateLoans} 