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
import { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      Classes.belongsTo(models.Course, { foreignKey: "courseId" });
      Classes.hasMany(models.Student, { foreignKey: "classId" });
    }
  }
  Classes.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Classes",
      underscored: true,
    }
  );

  sequelizePaginate.paginate(Classes);
  return Classes;
};
