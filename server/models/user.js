const { default: isEmail } = require("validator/lib/isEmail");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'user',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          validate: {
            len: [2, 30]
          }
        },
        firstName: {
          type: DataTypes.STRING(30),
          allowNull: false,
          validate: {
            len: [2, 30]
          }
        },
        lastName: {
          type: DataTypes.STRING(30),
          allowNull: false,
          validate: {
            len: [2, 40]
          }
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            len: [4, 40],
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING(255)
        }
      },
      { underscored: true }
    );
  };
