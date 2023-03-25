const router = require('express').Router();
const ratingService = require("../services/ratingService");

// Vi behåller delete för att kunna använda i Postman

router.delete('/', (req, res) => {
  const id = req.body.id;

  ratingService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;