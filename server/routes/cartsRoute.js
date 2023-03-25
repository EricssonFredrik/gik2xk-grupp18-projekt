const router = require('express').Router();
const cartService = require("../services/cartService")

// Vi försökte först att använda oss av Promise-kedjor men fick det aldrig att 
// fungera så vi testade med async await och det gick mycket bättre

router.post('/:cartId/addProduct/:productId', async (req, res) => {
  const { amount: qty } = req.body;
  const { productId, cartId } = req.params;

  try {
    const result = await cartService.addProduct(cartId, productId, qty);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

router.delete('/:cartId/removeProduct/:productId', async (req, res) => {
	try {
		const qty = req.body.amount;
		const productId = req.params.productId;
		const cartId = req.params.cartId;
		const result = await cartService.removeProduct(cartId, productId, qty);
		res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.delete('/', (req, res) => {
	const id = req.body.id;
	cartService.destroy(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});


router.get('/:id', (req, res) => {
  const id = req.params.id;

  cartService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  const cart = req.body;

  cartService.getAll(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {
  const cart = req.body;

  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;