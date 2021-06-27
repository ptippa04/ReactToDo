import React, { Component } from 'react';
import axios from 'axios';

class Todo extends Component {
    state = { 
        todoItems:[],
        text:'',
        error:''
     }


     componentDidMount(){
         console.log("component mounted")
         this.getTodos();
     }

     getTodos = () =>{

        axios.get(`http://localhost:4000/todos`)
        .then(res =>{

           console.log(res.data);
            const todoItems = res.data;
            this.setState({todoItems});
            this.setState({error:'',text:''})
        }).catch( err =>{
            console.log("could not get data");
        });
     }
    render() { 
        return ( <div>
         
            <h1 style ={{color:"darkGrey"}}> My Todo App</h1>
                        
            <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='enter the text'/>
            
     
            <button onClick={this.addTodo}>Add Todo</button>
           <p> <span>{this.state.error}</span></p>
            <ul>
                {this.state.todoItems.map(todo =>{ return(
                    <li key={todo._id}>{todo.title}</li>
                )})}
            </ul>
            
        </div> );
    }


   /* deleteTodo = (id) => {

        axios.delete(`http://localhost:4000/todos/${id}`)
        .then(res =>{
            this.getTodos();
        }).catch(err => console.log(err));

    }*/

    addTodo = () =>{
    

     const task = {title : this.state.text}
     if((!isNaN(task.title)) && (task.title.length >0)){
        this.setState({error: 'input cannot be a number'});
     }
     else if(task.title && (task.title.length >0)){
         console.log("adding todos")
         axios.post(`http://localhost:4000/todos`,task)
         .then(res =>{
             if(res.data){
                 console.log("got todos")
                 this.getTodos();
                 

             }
         }).catch(err => console.log(err));
     } else{
        this.setState({error: 'input is required'});
     }

    }

  
    handleChange = (e) =>{


        this.setState({text:e.target.value})
        if(!e.target.value){
            this.setState({error:''})
        }
    }
}
 
export default Todo ;