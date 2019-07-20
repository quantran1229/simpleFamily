'use strict';
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define('House', {
    address: DataTypes.JSONB,
    size: DataTypes.INTEGER,
    room: DataTypes.INTEGER
  }, {});
  House.associate = function(models) {
    House.belongsTo(models.Family,{
      foreginKey:'familyId',
      onDelete:'CASCADE'
    });
    House.hasMany(models.Member,{
      foreginKey:'houseId',
      as:'members'
    });
  };
  return House;
};
