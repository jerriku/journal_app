const { sequelize, DataTypes, Model } = require('../sequelize_index');

class Journal extends Model {

}

Journal.init({
    entry: DataTypes.STRING,
}, {
    sequelize,
    timestamps: true,
})

export = Journal;