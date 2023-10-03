const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const rol = db.define("rol", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Desactiva la generación automática de la ID
    },
    Name: {
        type: DataTypes.STRING,
    },
    Description: {
        type: DataTypes.STRING,
    },
});

rol.sync().then(() => {
    return Promise.all([
        rol.findOrCreate({
            where: {
                id: 0,
            },
            defaults: {
                Name: "superadmin",
                Description: "Superadministrador con acceso completo y privilegios elevados.",
            },
        }),
        rol.findOrCreate({
            where: {
                id: 1,
            },
            defaults: {
                Name: "director",
                Description: "Director de la empresa con funciones administrativas y supervisión general.",
            },
        }),
        rol.findOrCreate({
            where: {
                id: 2,
            },
            defaults: {
                Name: "administrador",
                Description: "Administrador con acceso y control sobre los recursos y configuraciones.",
            },
        }),
        rol.findOrCreate({
            where: {
                id: 3,
            },
            defaults: {
                Name: "coordinador",
                Description: "Coordinador encargado de la gestión y supervisión de un equipo o área específica.",
            },
        }),
        rol.findOrCreate({
            where: {
                id: 4,
            },
            defaults: {
                Name: "operador",
                Description: "Operador responsable de ejecutar tareas específicas asignadas por los coordinadores.",
            },
      })
    ]);
}).then(([rol1, rol2, rol3, rol4, rol5]) => {
}).catch((error) => {
    console.error("Error al buscar o crear los roles:", error);
});

module.exports = rol;
