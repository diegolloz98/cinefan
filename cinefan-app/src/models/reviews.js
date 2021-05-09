const Database = require("./database");

class Review extends Database{
    constructor(){
        console.log("reviews model...");
        super();
        this.useCollection("reviews");
    }
    
}




module.exports = new Review();