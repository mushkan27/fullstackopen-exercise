const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list'
  }
)

module.exports = ReadingList
