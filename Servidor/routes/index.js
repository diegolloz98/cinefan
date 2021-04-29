const express = require('express');
const userRoutes = require('./user');
const playlistRoutes = require('./playlists');
const reviewRoutes = require('./reviews');
const loginRoutes = require('./login');
const movieRoutes = require('./movies');
const router = express.Router();

module.exports = {
    userRoutes,
    reviewRoutes,
    playlistRoutes,
    loginRoutes,
    movieRoutes
};