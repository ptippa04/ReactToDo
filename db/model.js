const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todo = new Schema({
    title:{
        type:String
    },
    completed:{
        type: Boolean
    },
    todoDate:{
        type: Date
    }
    
})

const Todo = mongoose.model('todo',todo);
module.exports = Todo;