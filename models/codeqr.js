const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const CodeQR = sequelize.define(
  "codeqr",
  {
    code: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique:true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

CodeQR.sync()
  .then(() => {
    console.log('Modelo de datos "codeqr" sincronizado correctamente.');
  })
  .catch((err) => {
    console.log('Error al sincornizar el modelo de datos "codeqr"', err);
  });

module.exports = CodeQR;
