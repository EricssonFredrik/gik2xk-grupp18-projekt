const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

const validate = require('validate.js');

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
      const product = await db.product.findOne({
        where: { id },
        include: [db.rating]
      });
      return createResponseSuccess(product);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }  

async function getAll() {
    try {
        const allProducts = await db.product.findAll({include: [db.rating]});
    return createResponseSuccess(allProducts)
    }   catch(error) {
    return createResponseError(error.status, error.message); 
    }
  }

async function addRating(id, rating) {
    if (!id) {
      return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        rating.productId = id;
        const newRating = await db.rating.create(rating);
        return createResponseSuccess(newRating);
      } catch (error) {
        return createResponseError(error.status, error.message);
      }
    }

async function getRating(id) {
  const product = await getById(id);
  try {
    const productRating = product.data.ratings;
    if (!productRating) {
      return createResponseError(404, 'Ingen rating hittad');
    } else {
      return createResponseSuccess(productRating);
    }
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
    const invalidData = validate(product, constraints);
    if (invalidData) {
      return createResponseError(422, invalidData);
    }
    try {
      const newProduct = await db.product.create(product);
        return createResponseSuccess(newProduct);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(product, id) {
    const invalidData = validate(product, constraints);
    if(!id) {
        return createResponseError(422, 'Id är obligatoriskt.');
    }
    if (invalidData) {
        return createResponseError (422, invalidData);
    }
    try {
        const existingProduct = await db.product.findOne({where: {id}});
    if (!existingProduct){
        return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
        }
        await db.product.update(product, {
        where: { id }
        });
        return createResponseMessage(200, 'Produkten uppdaterades.' );
    }   catch (error){
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.product.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Produkten raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
    getById,
    getAll,
    create,
    update,
    destroy,
    addRating,
    getRating,
};







