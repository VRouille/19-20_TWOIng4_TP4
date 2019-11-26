var express = require('express');
var router = express.Router();
// Lodash utils library
const _ = require('lodash');
const axios = require('axios');

var movies=[]; 

/* GET movies listing */
router.get('/', (req, res) => {
    // Get List of movie and return JSON
    res.status(200).json({ movies });
  });
  
/* GET one movie with its id */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find movie in DB
    const movie = _.find(movies, ['id', id]);
    // Return movie
    res.status(200).json({
      message: 'Movie found!',
      movie 
    });
  });

/* PUT new movie */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { name } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    axios({
      method: 'get',
      url: 'http://www.omdbapi.com/?i=tt3896198&apikey=9d3a1f4f',
      responseType: 'json',
    })
    .then(function (response){
      console.log(response.data);
      Data = response.data;
      movies.push({Data, id});
      // Return message
      res.json({
      message: `Just added ${id}`,
      movie: { Data, id }
    });
  });
});

/* DELETE movie */
router.delete('/:id', (req, res) => {
    // Get the :id of the movie we want to delete from the params of the request
    const { id } = req.params;
    // Remove from "DB"
    _.remove(movies, ['id', id]);
    // Return message
    res.status(200).json({
      message: `Just removed ${id}`
    });
  });


/* UPDATE movie with its id */
router.post('/:id', (req, res) => {
    // Get the :id of the movie we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the movie we want to update from the body of the request
    const { name } = req.body;
    // Find in DB
    const movieToUpdate = _.find(movies, ["id", id]);
    // Update data with new data (js is by address)
    movieToUpdate.name = name;
  
    // Return message
    res.status(200).json({
      message: `Just updated ${id}`,
      movie: {name}
    });
  });
  
  module.exports = router;
