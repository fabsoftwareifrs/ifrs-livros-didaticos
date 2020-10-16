 /* Este arquivo é parte do programa LMS Livros Didáticos
  *
  * LMS Livros Didáticos é um software livre; você pode redistribuí-lo e/ou
  * modificá-lo dentro dos termos da Licença Pública Geral GNU Affero como
  * publicada pela Free Software Foundation (FSF); na versão 3 da
  * Licença.
  * 
  * Este programa é distribuído na esperança de que possa ser útil,
  * mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO
  * a qualquer MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a
  * Licença Pública Geral GNU para maiores detalhes.
  * 
  * Você deve ter recebido uma cópia da Licença Pública Geral GNU (em inglês) junto
  * com este programa na raiz do projeto, Se não, veja <http://www.gnu.org/licenses/>.
  */

'use strict'
require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      login: DataTypes.STRING,
      password: DataTypes.VIRTUAL(DataTypes.STRING),
      passwordHash: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  User.beforeSave(async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.verifyPassword = function (pwd) {
    return bcrypt.compare(pwd, this.passwordHash)
  }

  User.generateToken = function ({ id, role }) {
    const SECONDS_IN_A_DAY = 24 * 60 * 60
    return jwt.sign({ id, role }, process.env.AUTH_SECRET, {
      expiresIn: SECONDS_IN_A_DAY,
    })
  }

  return User
}
