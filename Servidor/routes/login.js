const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = require("./user");
const router = express.Router();

dotenv.config();

router.get("login",(req,res)=>{
    console.log(req);
    res.status(200).send();
});

module.exports = router;