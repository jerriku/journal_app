const { sequelize, DataTypes, Model } = require('../sequelize_index');

class Journal extends Model {

}

Journal.init({
    entry: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
})

export = Journal;