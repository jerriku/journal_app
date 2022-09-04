const { sequelize, DataTypes, Model } = require('../sequelize_index');

class Account extends Model {

}

Account.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

export = Account;