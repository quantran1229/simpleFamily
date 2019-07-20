'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    job: DataTypes.STRING,
    isHead: DataTypes.BOOLEAN
  }, {});
  Member.associate = function(models) {
    Member.belongsTo(models.Family,{
      foreginKey:'familyId',
      onDelete:'CASCADE'
    });

    Member.belongsTo(models.House,{
      foreginKey:'houseId',
      onDelete:'CASCADE'
    });
  };
  return Member;
};
