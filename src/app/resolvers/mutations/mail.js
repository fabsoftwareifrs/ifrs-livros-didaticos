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

import { sendMessage } from "./contacts";
import { Loan, Student, Copy, Period, Book } from "@models";
import { formatDate } from "../../utils/formatters";
import { UserInputError } from "apollo-server-express";

const warnMail = async (_, { loans }) => {
  const subject = "Lembrete de devolução.";
  let errors = [];
  await Promise.all(
    loans.map(async function (loanId) {
      let loan = await Loan.findByPk(loanId, {
        include: [
          { model: Student },
          { model: Copy, include: { model: Book } },
          { model: Period },
        ],
      });
      let message = `Olá ${
        loan.Student.name
      }! Estamos entrando em contato para lembra-lo(a) que você deve entregar seu exemplar do livro didático "${
        loan.Copy.Book.name
      }" de código "${loan.Copy.code}" até ${formatDate(loan.Period.end)}!`;
      let mail = await sendMessage(_, loan.Student.email, subject, message);
      if (!mail) {
        errors.push(loan.Student.email);
      }
    })
  );
  if (errors.length) {
    throw new UserInputError(
      `Erro ao enviar e-mail para:` +
        errors.map(function (error) {
          return " " + error;
        })
    );
  }
  return { response: "success" };
};

const lateMail = async (_, { loans }) => {
  const subject = "Devolução em atraso!";
  var errors = [];

  await Promise.all(
    loans.map(async function (loanId) {
      let loan = await Loan.findByPk(loanId, {
        include: [
          { model: Student },
          { model: Copy, include: { model: Book } },
          { model: Period },
        ],
      });
      let message = `Olá ${
        loan.Student.name
      }! A entrega seu exemplar do livro didático "${
        loan.Copy.Book.name
      }" de código "${loan.Copy.code}" está atarasada desde ${formatDate(
        loan.Period.end
      )}! Por favor faça a devolução o mais rapido possivel.`;
      let mail = await sendMessage(_, loan.Student.email, subject, message);
      if (!mail) {
        errors.push(loan.Student.email);
      }
    })
  );
  if (errors.length) {
    throw new UserInputError(
      `Erro ao enviar e-mail para:` +
        errors.map(function (error) {
          return " " + error;
        })
    );
  }
  return { response: "success" };
};

export default { warnMail, lateMail };
