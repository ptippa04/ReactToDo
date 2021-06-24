import React, { Component } from 'react';

class Todo extends Component {
    state = { 
        todoItems:[],
        text:'',
        error:''
     }
    render() { 
        return ( <div>
            <h1 style ={{color:"grey"}}> React Todo Application</h1>
            <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='enter the text'/>
            
     
            <button onClick={this.addTodo}>Add Todo</button>
           <p> <span>{this.state.error}</span></p>
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