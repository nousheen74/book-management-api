// In this db.js file we will only contain the database connection logic.
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "database.db");
let db = null;


//Databse connection logic.
const initializeDb = async () => { 
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
    }catch (error){
        console.log(`DB Error: ${error.message}`);
        console.log(error.stack);
        process.exit(1);
    }
}

module.exports = { initializeDb };