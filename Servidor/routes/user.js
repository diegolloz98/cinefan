const { users } = require("../src/models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

dotenv.config();

/** 
 * @swagger
 * /user/:id:
 *  get:
 *      description: retrieves information of a user with specified ID
 *      responses:
 *          '200':
 *              description: User found, info sent
 *          '201':
 *              description: User not found
*/

const app = express();

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

app.get("/user/:id", (req, res) =>{
    res.status(200).send("users endpoint by ID");
});

const storage = multer.diskStorage({
    destination: path.join(__dirname+'/uploads'),
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

function checkFileType(file,cb){
    const fileTypes= /jpeg|jpg|png|gif/;
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);

    if(extname && extname)
        return cb(null,true);
    else
        cb('Invalid file!');
}

const upload = multer({
    storage: storage,
    limits:{fileSize:1024*1024*10}, //10MB
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    } 
}).single('image');

app.get("/",(req, res) =>{
    console.log("users endpoint")
    res.sendFile(__dirname + "/views" + "/index.html")
    User.find({}, (err, results) =>{
        if(err) {
            console.log("Failed to retrive the items from the collection", err);
            return;
        }
        console.log("Users:", results);

    });
})

app.post('/user/:id', upload,async (req,res)=>{
    res.statusCode=200;
    let form=req.body;
    let image=req.file;
    console.log(image);
    MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, async function(err, client) {
        if(err) {
             console.log('Error\n',err);
        }
        console.log('Connected to Mongo');
        const collection = client.db("news-app").collection("users");
        await collection.insertOne({user: form.user, email: form.email, password: form.password, image: image.path});
        client.close();
     });
     upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
     });
     res.redirect('http://localhost:3000/');
})

module.exports = app;