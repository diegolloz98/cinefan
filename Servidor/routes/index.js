const express = require('express');
const userRoutes = require('./user');
const playlistRoutes = require('./playlists');
const reviewRoutes = require('./reviews');
const loginRoutes = require('./login');
const router = express.Router();

module.exports = {
    userRoutes,
    reviewRoutes,
    playlistRoutes,
    loginRoutes
};