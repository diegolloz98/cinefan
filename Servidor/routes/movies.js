const { movies } = require("../src/models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
var unirest = require("unirest");
const router = express.Router();


dotenv.config();

const app = express();

router.get("",async(req,res)=>{
    try{
    let imdbreq = unirest("GET", "https://imdb8.p.rapidapi.com/title/get-most-popular-movies");
    imdbreq.query({
        "homeCountry": "US",
        "purchaseCountry": "US",
        "currentCountry": "US"
    });
    
    imdbreq.headers({
        "x-rapidapi-key": "29fd27022cmsh007057c5f99f22ep1074e2jsn525b4647b843",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    imdbreq.end(function (re) {
        if (re.error) 
            throw new Error(re.error);
        let moviesToShow=[]
        for(let i = 0;i<3;i++){
            movie = re.body[i].replace("/title/","");
            moviesToShow.push(movie);
        }
        console.log(moviesToShow);
        res.status(200).header("Access-Control-Allow-Origin","*").send(moviesToShow);   
    });
    }catch(err){
        res.status(500).end(err);
    }
});

router.get("/:movieId",async (req,res)=>{
    let title=req.params.movieId;
    console.log(title);
    var req = unirest("GET", "https://imdb8.p.rapidapi.com/title/get-top-stripe");

    req.query({
        "tconst": title,
        "currentCountry": "US",
        "purchaseCountry": "US"
    });

    req.headers({
        "x-rapidapi-key": "29fd27022cmsh007057c5f99f22ep1074e2jsn525b4647b843",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (re) {
        if (re.error) 
            throw new Error(re.error);
        
        res.status(200).header("Access-Control-Allow-Origin","*").send(re.body);
    });
})

module.exports = router;