const { Router } = require('express');
const { Episode } = require('../models/Episode'); 

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Episode.getAll();
    console.log(data);
    res.json(data);
  });
//   .post('/', async (req, res) => {
//     const episode = await Episode.insert(req.body); 
//     if (req.body.quoteIds) {
//       await Promise.all(req.body.quoteIds.map((id) => episode.addQuoteById(id)));
//     }
//     res.json(episode);
//   });
