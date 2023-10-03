// const { DataTypes } = require("sequelize");
// const db = require("../db/connection");
// const dispositivos = require("./dispositivos");

// const topicos = db.define("topicos", {
//   nombre: {
//     type: DataTypes.STRING,
//   },
//   data: {
//     type: DataTypes.STRING,
//   },
//   data2: {
//     type: DataTypes.STRING,
//   },
// });

// topicos.belongsTo(dispositivos, {
//   foreignKey: {
//     name: "id_dispositivos",
//     allowNull: false,
//   },
// });

// topicos.sync({ force: true }) // Utiliza { force: true } para asegurarte de que la tabla se cree si no existe
//   .then(() => {
//     console.log("Tabla topicos creada correctamente.");
//   })
//   .catch((error) => {
//     console.error("Error al crear la tabla topicos:", error);
//   });


// module.exports = topicos;
