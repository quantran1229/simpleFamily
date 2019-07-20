'use strict';
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    name: DataTypes.STRING
  }, {});
  Family.associate = function(models) {
    Family.hasMany(models.Member,{
      foreginKey:'familyId',
      as:'members'
    });
    Family.hasMany(models.House,{
      foreginKey:'familyId',
      as:'houses'
    });

    Family.hasMany(models.Family,{
      foreginKey:'familyId',
      as:'families'
    })

    Family.belongsTo(models.Family,{
      foreginKey:'familyId',
      onDelete:'CASCADE'
    })
  };
  return Family;
};
