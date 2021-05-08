const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
var unirest = require("unirest");
const router = express.Router();

dotenv.config();

const app = express();

/** 
 * @swagger
 * /articles:
 *  get:
 *      description: tests endpoint, does nothing
 *      responses:
 *          '200':
 *              description: OK
 * 
 * /articles/:title:
 *  get:
 *      description: gets articles off of the Rainforest API related to the title param
 *      responses:
 *          '200':
 *              description: Articles sent
*/

router.get("", (req, res)=>{
    console.log(req);
    res.status(200).send('Articles sent!');
});

router.get("/:title",(req,res)=>{
    let title = req.params.title;

    let url = `https://api.rainforestapi.com/request?api_key=${encodeURIComponent(process.env.RAINFOREST_KEY)}&type=search&amazon_domain=amazon.com&search_term=${encodeURIComponent(title)}&category_id=2625374011`;

    let request = unirest("GET", url);
    
    request.end(function (re) {
        if (re.error) 
            throw new Error(re.error);
        
        res.status(200).header("Access-Control-Allow-Origin","*").send(re.body.search_results);
    });

});

module.exports = router;