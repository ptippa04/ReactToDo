const express = require('express')
const router = express.Router()

const Todo = require('../db/model');

router.get('/',(req,res,next) => {
    // const datar = [{
    //     title : "shopping",
    //     _id : "1233"
    // }]
    // res.send("responding");
     Todo.find({},'title')
      .then(data => res.json(data))
      .catch(next)

   
});

router.post('/',(req,res,next) => {
    if(req.body.title){
        Todo.create(req.body)
        .then(data => res.json(data))
        .catch(next)
    } else{
        res.json({
            error : "input is empty"
        })
    }

});


module.exports = router;