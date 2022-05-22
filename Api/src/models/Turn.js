const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Turn', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.FLOAT,
      DefaultValue: 0.5,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
};
