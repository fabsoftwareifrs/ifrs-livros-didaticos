 /* Este arquivo é parte do programa Foobar
  *
  * Foobar é um software livre; você pode redistribuí-lo e/ou
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

require('dotenv').config()
const { ApolloError } = require('apollo-server-express')

const { User } = require('@models')
const jwt = require('jsonwebtoken')

const getToken = (authorization) => {
  if (!authorization) return authorization

  const parts = authorization.split(' ')
  if (parts.length !== 2) throw new Error('Token Error.')

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) throw new Error('Token Mal formatted.')

  return token
}

const getAuthenticatedUser = async (authorization) => {
  try {
    const token = getToken(authorization)

    if (!token) return null

    const { id } = await jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOne({ where: { id } })

    return user
  } catch (e) {
    throw new ApolloError(e.message, 'JWT')
  }
}

module.exports = { getAuthenticatedUser }
