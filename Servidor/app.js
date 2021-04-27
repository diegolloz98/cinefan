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
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const socketIo = require('socket.io');

const {userRoutes, reviewRoutes, playlistRoutes,loginRoutes} = require("./routes/index");
const {Database, users, reviews, playlists} = require("./src/models");
const { env } = require('node:process');
const { Socket } = require('node:dgram');


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


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname+'/Content')));
app.use(express.static(path.join(__dirname+'/Scripts')));
app.use('/playlists',playlistRoutes);
app.use('/user',userRoutes);
app.use('/reviews',reviewRoutes);
app.use('/login',loginRoutes);
app.use(cors());

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
    console.log('se ha conectado', socket);
})

module.exports = router;