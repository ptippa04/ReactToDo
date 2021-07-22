import React, { Component } from 'react';
import moment from 'moment';


class TodoItem extends Component{

    state={
        editing:false
    }

    editTodo = (id) =>{

        console.log("edit mode activated",id);
        this.setState({editing:true});
    }
    handleUpdatedDone = event => {
        if (event.key === "Enter") {
          this.setState({ editing: false })
        }
      }

    render(){
        let viewMode ={}
        let editMode ={}
        if(this.state.editing){

            viewMode.display ="none"

        }else{
            editMode.display = "none"
        }
        

        return(
            <li className="item">
            <div className="todo-container" style={viewMode}>
                <input type="checkbox" className="checkbox" checked={ this.props.checked} onChange={()=>this.props.checkboxUpdateProps(this.props.todo._id)}/>{this.props.todo.title} {moment(this.props.todo.todoDate).format("LL")}
          
              
               
               <button style ={{background:"lightBlue"},{viewMode}} onClick = { () => this.editTodo(this.props.todo._id) }>Edit</button>
               
               
               <button style ={{background:"green"}} onClick = { () => this.props.deleteTodoProps(this.props.todo._id) }>Delete</button>
           </div> 
           <input type ="text" style={editMode} defaultValue ={this.props.todo.title}  onChange={e => {this.props.setUpdate(e.target.value,this.props.todo._id)
           }}   onKeyDown={this.handleUpdatedDone }></input>
               
           </li>
        )
    }
}

export default TodoItem