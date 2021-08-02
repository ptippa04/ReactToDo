import React, { Component } from 'react';
import axios from 'axios';



import NavBar from './NavBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Todo extends Component {
    state = { 
        todoItems:[],
        text:'',
        error:'',
        completed:false,
        todoDate : new Date(),
        value: "Add todo description here"
       
     }

     
    render() { 
       
        return ( 
            <>
               
               
            {/* <div class="inner" >  */}
         
            <h1 style ={{color:"darkGrey"}}> My Todos</h1>
            
                        
         {/*  <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='add todo here'/>*/}
            <div className ="maintodo">
                <label> Todo Name
            <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="N/A">select todo</option>
              <option value="Buy milk and eggs">Buy milk and eggs</option>
              <option value="Finish pending tasks">Finish pending tasks</option>
              <option value="update resume">update resume</option>
              <option value="finish tutorial">finish tutorial</option>
              <option value="Do Laundry">Do Laundry</option>
              <option value="Get Mails">Get Mails</option>
            </select>
            </label>
            </div>

            <div onChange={this.onChangeValue}>
                <label> Todo type
        <input type="radio" value="Male" name="gender" /> Male
        <input type="radio" value="Female" name="gender" /> Female
       
        </label>
      </div>
           
         <label>Start date  <DatePicker selected={this.state.todoDate} onChange={this.handleDateChange}></DatePicker></label>
         <label>End date  <DatePicker selected={this.state.todoDate} onChange={this.handleDateChange}></DatePicker></label>
         <label>
          Description:
          <textarea value={this.state.value} onChange={this.handleTextAresChange} />
        </label>


     
            <button style ={{background:"lightCyan"}} onClick={this.addTodo}>Add Todo</button> 
           <p> <span>{this.state.error}</span></p>
          
                {/*</div>*/}
                </>
            
         );
    }


   
   

    addTodo = () =>{
    

     const task = {title : this.state.text,
                  completed : false,
                todoDate: this.state.todoDate}
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

    handleDateChange = (date) =>{

        this.setState({todoDate: date})

    }

    handleTextAresChange =(e) =>{

    }

    onChangeValue(event) {
        console.log(event.target.value);
      }
}
 
export default Todo ;