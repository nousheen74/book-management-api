const express = require('express')
const app = express();
const {initializeDb} = require('./config/db')
const environment = require('./config/environment')
const port = environment.port
const bookRoutes = require('./routes/bookRoutes'); 
const morgan = require("morgan");
app.use(express.json()) //middleware to pares json data
app.use(morgan('dev'));

//GET API to get list of all books
app.use("/books", bookRoutes); 

// Here we will initialize the database and start the server
initializeDb() // This is called as promise chaining.
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        });
    })
    .catch((error) => {
        console.log(`Failed to initialise the database: ${error.message}`);
        process.exit(1);
    })