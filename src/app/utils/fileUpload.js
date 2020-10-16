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

const fs = require('fs')

module.exports = ({ stream, filename, mimetype, types = [] }) => {
  if (!types.includes(mimetype)) {
    throw new Error('Formato de imagem não permitido!')
  }

  const pathFile = `uploads/${filename}`

  return new Promise((resolve, reject) => {
    stream
      .on('open', () => {
        stream
          .pipe(fs.createWriteStream(pathFile))
          .on('error', (error) => reject(error))
          .on('finish', () => resolve({ pathFile }))
      })
      .on('error', (error) => {
        if (stream.truncated) {
          fs.unlinkSync(pathFile)
          reject(new Error('Tamanho do arquivo excedeu o limite!'))
        }
        reject(error)
      })
  })
}
