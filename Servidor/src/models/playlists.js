const Database = require("./database");

class Playlist extends Database{
    constructor(){
        console.log("playlist model...");
        super();
        this.useCollection("playlist");
    }
    
}




module.exports = new Playlist();