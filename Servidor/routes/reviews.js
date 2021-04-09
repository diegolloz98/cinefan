const { reviews } = require("../src/models");
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
 * /reviews/:movie_id:
 *  get:
 *      description: given a movie_id, this fetches all reviews of said movie
 *      responses:
 *          '200':
 *              description: Movie_id is valid, reviews sent
 *          '201':
 *              description: Movie_id is invalid, no reviews were found
 *  post:
 *      description: given a movie_id, it posts a user review on the database
 *      responses:
 *          '200':
 *              description: Review posted
 *          '201':
 *              description: Review couldn't be posted (todo review validation)
 * /reviews/:movie_id:review_id: 
 *  patch:
 *      description: given a movie_id and review_id we update said review and acknowledge the change
 *      responses:
 *          '200':
 *              description: Review edited
 *          '201':
 *              description: Edit couldn't be posted (todo review validation)
 *  delete:
 *      description: given a movie_id and review_id we remove said review and acknowledge the change
 *      responses:
 *          '200':
 *              description: Review removed
 *          '201':
 *              description: Review couldn't be removed
 * 
*/


app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

app.get("/reviews/:movie_id", (req, res)=>{
    res.status(200).send('all reviews of movie_id');
});

app.post("/reviews/:movie_id", (req, res)=>{
    res.status(200).send('review posted!');
});

app.patch("/reviews/:movie_id:review_id", (req, res)=>{
    res.status(200).send('review edited!');
});

app.delete("/reviews/:movie_id:review_id", (req, res)=>{
    res.status(200).send('review removed!');
});