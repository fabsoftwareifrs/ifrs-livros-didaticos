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

module.exports = (message) => `
<table border='0' width='100%' height='100%' cellpadding='0' cellspacing='0' style='color:#444;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif'>
	<tr>
		<td style='background-color:#d3d3d3; padding:10px 0px' align='center'>
			
						<img height='150'src='cid:ifrsbg@maisbento.com'/>
					
		</td>
	</tr>
	<tr>
		<td style='padding:35px 0px 35px; text-align:center'>
			${message}
		</td>
	</tr>
	
	<tr>
		<td style='background-color: #D3D3D3; text-align:center; padding:15px 0px; font-size:11px'>
			Esta é uma mensagem automática. Por favor, <b>não responda este e-mail</b>.
		</td>
	</tr>

</table>
`;
