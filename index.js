const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const db = require('./db/server.js');

let corsOptions = {
    origin: 'http://localhost:3000'
  }
const todos =require('./routes/todos');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/todos', todos);


mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.get('/', (req,res) =>{
    res.json({message : "Welcome to the React Todo  App"});
});

const PORT = 4000;
app.listen(PORT,() =>{
console.log(`Server started at port: ${PORT}`);
}
);