const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Review = require('../models/Reviews');

module.exports = Router()
  .delete('/:id',  authenticate, authorize, async (req, res, next) => {
    try {
      const review = await Review.delete({
        id: req.params.id
      });
      res.json(review);
    } catch(e) {
      next(e);
    }
  });
