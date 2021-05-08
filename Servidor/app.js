const express = require('express');
const http = require('http');
const path=require('path');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors=require('cors');
const socketIo = require('socket.io');

const {userRoutes, reviewRoutes, playlistRoutes,loginRoutes, movieRoutes, articleRoutes} = require("./routes/index");
const {Database, users, reviews, playlists, movies} = require("./src/models");

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
app.use('/api/playlists',playlistRoutes);
app.use('/api/user',userRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/movies',movieRoutes);
app.use('/api/articles',articleRoutes);
app.use(cors());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cookieSession({
    name:'session',
    keys:['key1','key2']
}))

const server = app.listen(port, ()=>{
    console.log('server running');
});

const io = socketIo(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ['GET','POST'],
        allowHeaders: ['Authorization'],
        credentials: true
    }
});

io.on('connection',socket=>{
    console.log('se ha conectado');

    socket.on('ratedFilm', data=>{
        if(data.user == undefined)
            console.log('No se ha logeado, lmao')
        console.log(data);
    })
})

module.exports = router;