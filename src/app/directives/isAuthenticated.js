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

const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class IsAuthenticated extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      const [, , { authenticatedUser }] = args
      console.log('directive', authenticatedUser)
      if (authenticatedUser === null) {
        throw new AuthenticationError('You are not authenticated!')
      }

      const result = await resolve.apply(this, args)

      return result
    }
  }
}

module.exports = IsAuthenticated
