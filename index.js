const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const db = require('./db/server.js');
const mysql = require('mysql');
const config = require('./db/config.js');
let connection = mysql.createConnection(config);

let corsOptions = {
    origin: 'http://localhost:3000'
  }
const todos =require('./routes/todos');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/todos', todos);


// connecting mongodb 
 /*mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})*/


//connecting mysql

connection.connect(function(err){
    if(err){
        return console.error('error :'+err.message);
    }

    
    console.log("connected to MYSQL server");

    let createTodos = `create table if not exists todos(
        _id int primary key auto_increment,
        title varchar(255)not null,
        completed tinyint(1) not null default 0,
        todoType varchar(255)not null
    )`;

    let createDescriptionTodos = `create table if not exists todos_desc(
        _id int primary key auto_increment,
        todoDescription varchar(255)not null,   
        todoStartDate DATETIME(6),
        todoEndDate DATETIME(6)

    )`;

    connection.query(createTodos, function(err, results, fields){

        if(err){
            console.lof(err.message);
        }

        console.log("todo table got created");
    });


    connection.query(createDescriptionTodos, function(err, results, fields){

        if(err){
            console.lof(err.message);
        }

        console.log("todo desc table got created");
    });
    connection.end(function(err){
        if(err){
            return console.log(err.message);
        }
    });

});





app.get('/', (req,res) =>{
    res.json({message : "Welcome to the React Todo  App"});
});

const PORT = 4000;
app.listen(PORT,() =>{
console.log(`Server started at port: ${PORT}`);
}
);