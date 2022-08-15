const { Router } = require('express');

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

  .get('/:id', async (req, res, next) => {
    try {
      const matchingEatery = await Restaurant.getById(req.params.id);
      if (!matchingEatery) {
        next();
      }
      res.json(matchingEatery);
    } catch(e) {
      next(e);
    }
  });
