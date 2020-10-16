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
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
