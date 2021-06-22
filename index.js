const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/server.js');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

db.mongoose.connect(db.url,{
    useNewUrlParser: true
})
.then(()=>{
    console.log("connected to db");
})
.catch(err => {
    console.log(err);
});


app.get('/', (req,res) =>{
    res.json({message : "Welcome to the React Todo  App"});
});

const PORT = 4000;
app.listen(PORT,() =>{
console.log(`Server started at port: ${PORT}`);
}
);