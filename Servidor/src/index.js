const express = require('express');
const app = express();
const http = require('http');
const express = require('express');
const path=require('path');
const fetch = require('node-fetch');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname+'/Content')));
app.use(express.static(path.join(__dirname+'/Scripts')));

app.listen(port, ()=>{
    console.log('server running on port ${port}');
});

app.get('/user',(req,res)=>{
    
});