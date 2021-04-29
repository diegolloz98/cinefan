const Database = require("./database");

class Movies extends Database{
    constructor(){
        console.log("movies model...");
        super();
        this.useCollection("movies");
    }
    
}




module.exports = new Movies();