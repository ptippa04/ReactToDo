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

        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then(res =>{

           console.log(res.data);
            const todoItems = res.data;
            this.setState({todoItems});
        }).catch( err =>{
            console.log("could not get data");
        });
     }
    render() { 
        return ( <div>
            <h1 style ={{color:"Grey"}}> React Todo Application</h1>
            <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='enter the text'/>
            
     
            <button onClick={this.addTodo}>Add Todo</button>
           <p> <span>{this.state.error}</span></p>
            <ul>
                {this.state.todoItems.map(todo =>{ return(
                    <li key={todo.id}>{todo.title}</li>
                )})}
            </ul>
        </div> );
    }

    addTodo = () =>{
        const newTodo = [{
       "title": this.state.text
        }
        ]
        if(!this.state.text){
            this.setState({error: 'input required'});
        } else if(!isNaN(this.state.text)){
            this.setState({error: 'input cannot be a number'});

        } else{

        this.setState(state =>({
            todoItems : this.state.todoItems.concat(newTodo),
            text:'',
            error:''
        }));

       
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