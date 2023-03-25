module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    'cartRow',
    {
      amount: {
        type: Datatypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      
      primaryKey: true,
      uniqueKeys: {
        cartProduct_unique: {
          fields: ['cart_id', 'product_id'],
        },
      },
      underscored: true,
    })};