const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./journal.db"
});

export = { sequelize, DataTypes, Model };