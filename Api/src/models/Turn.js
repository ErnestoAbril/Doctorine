const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    'Turn',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        // no  creo que haga falta
        type: DataTypes.STRING,
      },
      description: {
        // no  creo que haga falta
        type: DataTypes.STRING,
      },
    },
    { timestamps: false } //eliminar
  );
};
