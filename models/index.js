const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const filebasename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize('seq', 'root', 'root', {dialect: 'mysql', host: 'localhost'});
 

fs
  .readdirSync(__dirname)
  .filter(file => {
    const returnFile = (file.indexOf('.') !== 0) && (file !== filebasename) && (file.slice(-3) === '.js')
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate();
sequelize.sync();

module.exports = db;