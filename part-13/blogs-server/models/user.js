const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')


  
  class User extends Model {}
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true, // sequelize to check if the username is a valid email
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
  })

//   User.sync()

  module.exports = User