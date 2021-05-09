const database = require('./database');
const playlists = require('./playlists');
const reviews = require('./reviews');
const users = require('./users');
const movies = require('./movies');

module.exports = {
    users,
    playlists,
    reviews,
    movies,
    database
};