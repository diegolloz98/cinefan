const { users } = require("../src/models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();

dotenv.config();

const app = express();

app.get('',(req,res)=>{
    let url =  "https://imdb8.p.rapidapi.com/title/get-most-popular-movies"
});