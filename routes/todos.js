const express = require('express')
const router = express.Router()

const Todo = require('../db/model');

router.get('/',(req,res,next) => {
    // const datar = [{
    //     title : "shopping",
    //     _id : "1233"
    // }]
    // res.send("responding");
     Todo.find({})
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

router.delete('/:id',(req,res,next) =>{
    Todo.findOneAndDelete({'_id':req.params.id})
    .then(data => res.json(data))
    .catch(next);
})


router.post('/:id',(req,res,next) =>{
    Todo.findById({'_id':req.params.id})
    .then(todo =>{
        todo.title = req.body.title;
        

        todo.save().then(todo =>{
            res.json(todo)
        })
        .catch(err =>{
            res.status(400).send("update not possibel");
        })
    })
})


module.exports = router;