const { sequelize, DataTypes, Model } = require('../sequelize_index');
const Journal = require('./Journal');

class Account extends Model {

}

Account.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    timestamps: true,
});

Account.hasMany(Journal, { as: "journals", foreignKey: "account_id" });
Journal.belongsTo(Account, { foreignKey: "account_id" });

export = Account;