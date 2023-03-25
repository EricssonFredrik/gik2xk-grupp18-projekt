module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'cart',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
      priceTotal: {
				allowNull: false,
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
    },
      { underscored: true }
    );
  }; 