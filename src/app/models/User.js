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

"use strict";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.VIRTUAL(DataTypes.STRING),
      passwordHash: DataTypes.STRING,
      accessLevel: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );

  User.beforeSave(async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    }
  });

  User.prototype.verifyPassword = function (pwd) {
    return bcrypt.compare(pwd, this.passwordHash);
  };

  User.generateToken = function ({ id, role }) {
    const SECONDS_IN_A_DAY = 24 * 60 * 60;
    return jwt.sign({ id, role }, process.env.AUTH_SECRET, {
      expiresIn: SECONDS_IN_A_DAY,
    });
  };

  sequelizePaginate.paginate(User);
  return User;
};
