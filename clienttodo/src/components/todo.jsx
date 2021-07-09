import React, { Component } from 'react';
import axios from 'axios';

import TodoItem from './TodoItem';

import NavBar from './NavBar';

class Todo extends Component {
    state = { 
        todoItems:[],
        text:'',
        error:'',
        completed:false
       
     }


     componentDidMount(){
         console.log("component mounted")
         this.getTodos();
     }

     getTodos = () =>{

        axios.get(`http://localhost:4000/todos`)
        .then(res =>{

           console.log("got todos from momgo",res.data);
            const todoItems = res.data;
            this.setState({todoItems});
            this.setState({error:'',text:''})
        }).catch( err =>{
            console.log("could not get data");
        });
     }


     setUpdate =(updatedTitle,id) =>{

        let task ={title: updatedTitle,
                    id:id}
                    if(task.title && (task.title.length >0)){
                        console.log("updating todos")
                        axios.post(`http://localhost:4000/todos/${id}`,task)
                        .then(res =>{
                            if(res.data){
                                console.log("got updated todos")

                               if(res.data.title === updatedTitle){
                                   console.log("same titles")
                                this.setState({

                                    todoItems: this.state.todoItems.map(todo => {
                                        if (todo._id === id) {
                                            console.log("setting title")
                                          todo.title = updatedTitle
                                        }
                                        return todo
                                      })
                                   
                                });
                            }

                                
               
                            }
                        }).catch(err => console.log(err));
                    }



     }

     deleteTodo = (id) => {
        console.log("deleting todos")

        axios.delete(`http://localhost:4000/todos/${id}`)
        .then(res =>{
            this.getTodos();
        }).catch(err => console.log(err));

    }

    checkboxHandleChange =id =>{

        

        this.setState({
            todoItems:this.state.todoItems.map(todo=>{
                console.log("clciked todo checkbox")

                if(todo._id === id){
                    console.log("updated state of todo checkbox")
                    todo.completed = !todo.completed;

                    let task= {
                        title:todo.title,
                        completed:todo.completed,
                        id:id
                    }
                    axios.post(`http://localhost:4000/todos/${id}`,task)
                    .then(res =>{
                        if(res.data){
                            console.log("checkbox state updated in db");
                        }
                    })
                    .catch(err => console.log(err));


                }
                return todo;
            })
        });
    }


     
    render() { 
       
        return ( 
            <>
               
                <div className="inner">
                   
         
            <h1 style ={{color:"darkGrey"}}> My Todos</h1>
            
                        
         {/*  <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='add todo here'/>*/}
         
            <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="N/A">select todo</option>
              <option value="Buy milk and eggs">Buy milk and eggs</option>
              <option value="Finish pending tasks">Finish pending tasks</option>
              <option value="update resume">update resume</option>
              <option value="finish tutorial">finish tutorial</option>
              <option value="Do Laundry">Do Laundry</option>
              <option value="Get Mails">Get Mails</option>
            </select>
          
     
            <button style ={{background:"lightCyan"}} onClick={this.addTodo}>Add Todo</button>
           <p> <span>{this.state.error}</span></p>
           <ul>
          
               {this.state.todoItems.map(todo =>{ return(

                    <TodoItem key={todo._id} todo={todo}  checked={todo.completed} checkboxUpdateProps={this.checkboxHandleChange} setUpdate={this.setUpdate} deleteTodoProps={this.deleteTodo}/>
                  
                   
                
                )})}
                </ul>
                </div>
                </>
            
         );
    }


   
   

    addTodo = () =>{
    

     const task = {title : this.state.text,
                  completed : false}
     if((!isNaN(task.title)) && (task.title.length >0)){
        this.setState({error: 'input cannot be a number'});
     }
     else if(task.title && (task.title.length >0)){
         console.log("adding todos")
         axios.post(`http://localhost:4000/todos`,task)
         .then(res =>{
             if(res.data){
                 console.log("got todos",res.data)
                 this.getTodos();
                 

             }
         }).catch(err => console.log(err));
     } else{
        this.setState({error: 'input is required'});
     }

    }

  
    handleDropdownChange = (e) =>{


        this.setState({text:e.target.value})
        if(!e.target.value){
            this.setState({error:''})
        }
    }
}
 
export default Todo ;