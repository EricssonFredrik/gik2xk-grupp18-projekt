const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

async function getAll() {
    try {
        const allRatings = await db.rating.findAll();
    return createResponseSuccess(allRatings)
    }   catch(error) {
    return createResponseError(error.status, error.message); 
    }
  }

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.rating.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Rating raderat.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
    getAll,
    destroy
};

