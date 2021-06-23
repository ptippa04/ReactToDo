import React, { Component } from 'react';

class Todo extends Component {
    state = { 
        todoItems:[],
        text:''
     }
    render() { 
        return ( <div>
            <h1 style ={{color:"Red"}}> React Todo Application</h1>
            <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='enter the text'/>
     
            <button onClick={this.addTodo}>Add Todo</button>
            <ul>
                {this.state.todoItems.map(todo =>{ return(
                    <li key={todo.id}>{todo}</li>
                )})}
            </ul>
        </div> );
    }

    addTodo = () =>{
        const newTodo = [
        this.state.text
        ]

        this.setState(state =>({
            todoItems : this.state.todoItems.concat(newTodo),
            text:''
        }));
    }

  
    handleChange = (e) =>{
        this.setState({text:e.target.value})
    }
}
 
export default Todo ;