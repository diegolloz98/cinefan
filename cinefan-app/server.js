const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname+'/dist/cinefan-app', {index:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/dist/cinefan-app/index.html'));
});

app.get('',(req,res)=>{
    res.sendFile(path.join(__dirname+'/dist/cinefan-app/index.html'));
});

server.listen(port, function(){
    console.log("App running on port " + port);    
});