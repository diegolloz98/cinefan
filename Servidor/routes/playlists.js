const { playlists } = require("../src/models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

dotenv.config();

const app = express();

/** 
 * @swagger
 * /playlists:
 *  post:
 *      description: adds a new playlist to the db
 *      responses:
 *          '200':
 *              description: playlist created and uploaded successfully
 *          '201':
 *              description: playlist couldn't be created (todo validation)
 * /playlists/:user_id:
 *  get:
 *      description: fetches all playlists made by user with user_id
 *      responses:
 *          '200':
 *              description: playlists by user sent
 *          '201':
 *              description: playlists couldn't be fetched (invalid user or no playlists created)
 * /playlists/:playlist_id:
 *  get:
 *      description: fetches playlist with playlist_id
 *      responses:
 *          '200':
 *              description: playlist sent
 *          '201':
 *              description: playlist couldn't be fetched
 *  patch:
 *      description: modifies values of playlist with playlist_id
 *      responses:
 *          '200':
 *              description: playlist modified successfully
 *          '201':
 *              description: playlist couldn't be modified (todo validation)
 *  delete:
 *      description: removes playlist
 *      responses:
 *          '200':
 *              description: playlist deleted successfully
 *          '201':
 *              description: playlist couldn't be deleted
*/

app.post("/playlists", (req, res)=>{
    res.status(200).send('Playlist created!');
});

app.get("/playlists/:user_id", (req, res)=>{
    res.status(200).send('Playlists from user sent!');
});

app.get("/playlists/:playlist_id", (req, res)=>{
    res.status(200).send('Playlist sent!');
});

app.delete("/playlists/:playlist_id", (req, res)=>{
    res.status(200).send('Playlist removed!');
});

app.patch("/playlists/:playlist_id", (req, res)=>{
    res.status(200).send('Playlist modified!');
});