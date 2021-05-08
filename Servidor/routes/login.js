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

const passport = require('passport');
require('../passport-config');

dotenv.config();

/** 
 * @swagger
 * /login:
 *  get:
 *      description: test endpoint, does nothing
 *      responses:
 *          '200':
 *              description: OK
 * /login/google:
 *  get:
 *      description: auths passport
 * 
 * /login/auth:
 *  get:
 *      description: redirects if user was auth'd successfully or not
 * 
 * /login/success:
 *  get:
 *      description: redirects user to main page, logged in
 * 
 * /login/failure:
 *  get:
 *      description: does nothing as user couldn't be auth'd
 * 
 * /login/logout:
 *  get:
 *      description: logs out user and redirects to main page
 *      
*/

router.get('',(req,res)=>{
    console.log(req);
    res.status(200).send();
});

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth',
    passport.authenticate( 'google', {
        successRedirect: 'success',
        failureRedirect: 'failure'
}));

const isLoggedIn=(req,res,next)=>{
    console.log(req);
    if(1 || req.user){      //TODO: validar
        next();
    }else{
        res.status(401).redirect('http://localhost:4200');
    }
};

router.get('/success',isLoggedIn,(req,res)=>{
    res.redirect('http://localhost:4200')
});

router.get('/failure',(req,res)=>{

});

router.get('/logout',(req,res)=>{
    req.session=null;
    req.logout();
    res.redirect('/');
});

module.exports = router;