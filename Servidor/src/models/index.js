const database = require('./database');
const playlists = require('./playlists');
const reviews = require('./reviews');
const users = require('./users');

module.exports = {
    users,
    playlists,
    reviews,
    database
};