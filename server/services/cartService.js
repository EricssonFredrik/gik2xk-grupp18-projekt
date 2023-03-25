const db = require('../models');
const validate = require('validate.js');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');


const constraints = {
    title: {
      length: {
        minimum: 2,
        maximum: 100,
        tooShort: '^Titeln måste vara minst %{count} tecken lång.',
        tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
      }
    }
  };

  async function getById(id) {
    try {
      const cart = await db.cart.findOne({
        where: { id},
        include: [db.product]
      });
      return createResponseSuccess((cart));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }  

  async function addProduct(cartId, productId, amount) {  
    try {
      const currentCart = await db.cart.findOne({ where: { id: cartId } });
      const currentProduct = await db.product.findOne({ where: { id: productId } });
  
      const [currentCartRow] = await db.cartRow.findOrCreate({
        where: { cartId, productId },
        defaults: { amount: 0 },
      });
  
      currentCartRow.amount += +amount;
      currentCart.priceTotal += currentProduct.price * amount;
  
      await Promise.all([currentCartRow.save(), currentCart.save()]);
      return createResponseSuccess(currentCartRow);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }

  //Använder funktionen bara när vi vill ta bort produkter från varukorgen via postman
async function removeProduct(cartId, productId, amount) {
  try {
  const currentCart = await db.cart.findOne({ where: { id: cartId }});
  const currentProduct = await db.product.findOne({ where: { id: productId }});
  const currentCartRow = await db.cartRow.findOne({ where: { cartId, productId }});
  const priceChange = currentProduct.price * amount;
  if (currentCartRow.amount <= amount) {
  await currentCartRow.destroy();
  } else {
  currentCartRow.amount -= amount;
  await currentCartRow.save();
  }
  currentCart.priceTotal -= priceChange;
  await currentCart.save();
  return createResponseSuccess(currentCartRow);
  } catch (error) {
  return createResponseError(error.status, error.message);
  }
  }

  
async function create(cart) {
    const invalidData = validate(cart, constraints);
    if (invalidData) {
      return createResponseError(422, invalidData);
    }
    try {
      const newCart = await db.cart.create(cart);
        return createResponseSuccess(newCart);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(cart, id) {
    const invalidData = validate(cart, constraints);
    if(!id) {
        return createResponseError(422, 'Id är obligatoriskt.');
    }
    if (invalidData) {
        return createResponseError (422, invalidData);
    }
    try {
        const existingCart = await db.cart.findOne({where: {id}});
    if (!existingCart){
        return createResponseError(404, 'Hittade ingen kundvagn att uppdatera.');
        }
        await db.cart.update(cart, {
        where: { id }
        });
        return createResponseMessage(200, 'Kundvagn uppdaterades.' );
    }   catch (error){
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.cart.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Kundvagn raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
      const allCarts = await db.cart.findAll();
  return createResponseSuccess(allCarts)
  }   catch(error) {
  return createResponseError(error.status, error.message); 
  }
}

module.exports = {
    getById,
    create,
    update,
    destroy,
    addProduct,
    removeProduct,
    getAll
};