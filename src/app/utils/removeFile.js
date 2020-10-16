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

const path = require('path')
const { unlink } = require('fs')

module.exports = (file) => {
  return new Promise((resolve) => {
    if (!file) resolve(false)
    const pathname = path.resolve('uploads', file)
    unlink(pathname, (e) => resolve(!e))
  })
}
