const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Calendar",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
     
    },
    { timestamps: false }
  );
};
