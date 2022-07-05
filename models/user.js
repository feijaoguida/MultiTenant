module.exports = (sequelize, DataTypes) => { 
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tenantId: DataTypes.INTEGER,
  });

  User.associate = function(models)  { 
    User.addScope('byIdTenant', (tenantId) => {
      return {
        where: {
          tenantId,
        },
      };
    });
  };

  return User;
};