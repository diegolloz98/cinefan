const express = require('express');
const http = require('http');
const path=require('path');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const {userRoutes, reviewRoutes, playlistRoutes,loginRoutes} = require("./routes/index");
const {Database, users, reviews, playlists} = require("./src/models");


require('./passport-config');

const router = express.Router();
const app = express();


const port = process.env.PORT;

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/login',loginRoutes);

app.use(cookieSession({
    name:'session',
    keys:['key1','key2']
}))

app.listen(port, ()=>{
    console.log('server running');
});


module.exports = router;