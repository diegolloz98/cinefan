const express = require('express');
const http = require('http');
const path=require('path');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {userRoutes, reviewRoutes, playlistRoutes} = require("./routes/index");
const {Database, users, reviews, playlists} = require("./src/models");
const router = express.Router();
const app = express();

const port = process.env.PORT;

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            'title': 'cinefan API',
            'version': '1.0.0'
        }
    },
    apis: ['./routes/*.js','app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname+'/Content')));
app.use(express.static(path.join(__dirname+'/Scripts')));
app.use('/playlists',playlistRoutes);
app.use('/user',userRoutes);
app.use('/reviews',reviewRoutes);



app.listen(port, ()=>{
    console.log('server running');
});


module.exports = router;