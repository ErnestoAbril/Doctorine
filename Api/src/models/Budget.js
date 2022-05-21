const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Budget', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    services: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
