const express = require('express')
const router = express.Router()

const Todo = require('../db/model');

const mysql = require('mysql');
let config = require('../db/config');
let connection = mysql.createConnection(config);

router.get('/',(req,res,next) => {
   // mongodb
    //  Todo.find({})
    //   .then(data => res.json(data))
    //   .catch(next);
 

    //Mysql

    let sql ='SELECT t._id,t.title,t.completed,t.todoType,td.todoDescription,td.todoStartDate,td.todoEndDate FROM todos_desc td JOIN todos t ON (td._id = t._id)';
    connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        console.log("select result is"+results);
        res.json(results);
      });
      
     



   
});

router.post('/',(req,res,next) => {

    //mongodb
    // if(req.body.title){
    //     Todo.create(req.body)
    //     .then(data => res.json(data))
    //     .catch(next)
    // } else{
    //     res.json({
    //         error : "input is empty"
    //     })
    // }

    //MYSQL

    if(req.body.title){

        console.log(req.body);

    let stmt = 'INSERT INTO todos(title,completed,todoType) VALUES(?,?,?)';
    let todo = [''+req.body.title,false,''+req.body.todoType];
    connection.query(stmt, todo, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // get inserted id
        console.log('Todo Id:' + results.insertId);

       
      });
      let stmt2 = 'INSERT INTO todos_desc(todoDescription,todoStartDate,todoEndDate) VALUES(?,?,?)';
      let todo2 = [''+req.body.description,''+req.body.startTodoDate,''+req.body.endTodoDate];
    connection.query(stmt2, todo2, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // get inserted id
        console.log('Todo Id:' + results.insertId);

        res.json({
            data:results
        })
      });


    } else {
        res.json({
                    error : "input is empty"
                 })

    }

   

});

router.delete('/:id',(req,res,next) =>{

    // mongodb
    // Todo.findOneAndDelete({'_id':req.params.id})
    // .then(data => res.json(data))
    // .catch(next);

    //Mysql

   // let sql = `DELETE FROM todos WHERE _id =?`;
   let id = req.params.id;
   let sql = 'DELETE td, t FROM todos_desc td JOIN todos t ON (td._id = t._id) WHERE t._id =?';
   
    console.log("id is "+id);
    connection.query(sql, [id],(error,results,fields) =>{
        if(error){
            return console.error(error.message);
        }
        console.log('deleted rows',results.affectedRows);
        res.send(results);
        
            
    });
})


router.post('/:id',(req,res,next) =>{
    // Todo.findById({'_id':req.params.id})
    // .then(todo =>{
    //     todo.title = req.body.title;
        

    //     todo.save().then(todo =>{
    //         res.json(todo)
    //     })
    //     .catch(err =>{
    //         res.status(400).send("update not possibel");
    //     })
    // })

    //mysql
    let title = req.body.title;
    let completed = req.body.completed;
   // let date = req.body.todoDate;
    let id = req.params.id;

    let sql = 'UPDATE todos SET completed=? WHERE _id=?';
    connection.query(sql, [completed,id],(error,results,fields) =>{
        if(error){
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        let data = {
            title: req.body.title
        }
       res.send(data);
        
            
    });




})


module.exports = router;