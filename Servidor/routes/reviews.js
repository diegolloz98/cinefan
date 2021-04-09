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

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            'title': 'cinefan API',
            'version': '1.0.0'
        }
    },
    apis: ['.routes/*.js','app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);