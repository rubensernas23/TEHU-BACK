const { Sequelize } = require("sequelize");


 const db = new Sequelize(
   "TEHU",
   "root",
   "",
   {
     host: "localhost",
     dialect: "mysql",
     define: { freezeTableName: false },
     timezone: "-05:00",  
     dialectOptions: {
       dateStrings: true,
       typeCast: true,
       timezone: "-05:00",
     },
   }
 );


/* const db = new Sequelize(
  "piwdzivo_tehuapi",
  "piwdzivo_theuadmin",
  "jabondemanos23",
  {
    host: "216.246.112.154",
    dialect: "mysql",
    define: { freezeTableName: true },
    timezone: "-05:00",  Establecer la zona horaria deseada para las consultas
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "-05:00",  Establecer la zona horaria deseada para la conexión
    },
  }
); */

module.exports = db;
