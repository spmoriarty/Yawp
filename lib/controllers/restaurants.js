const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch(e) {
      next(e);
    }    

  })

  .get('/:restId', async (req, res, next) => {
    try {
      const matchingEatery = await Restaurant.getRestId(req.params.restId);
      if (!matchingEatery) {
        next();
      }
      res.json(matchingEatery);
    } catch(e) {
      next(e);
    }
  })
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getRestId(req.params.restId);
      const review = await restaurant.addReview(
        {
          user_id: req.user.id,
          eatery_id: req.params.restId,
          ...req.body,
        }
      );
      res.json(review);
    } catch (e) {
      next (e);
    } 
  });
  
