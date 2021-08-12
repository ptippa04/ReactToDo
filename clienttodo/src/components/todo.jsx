import React, { Component } from 'react';
import axios from 'axios';
import Modal from './Modal';



import NavBar from './NavBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class Todo extends Component {
    state = { 
       
        error:'',
        title: "select todo",
        completed:false,
        startTodoDate : new Date(),
        endTodoDate : new Date(),
        textareaValue: " ",
        selectedOption : "personal",
        show : false
       
     }

     showModal = () =>{
         this.setState({show:!this.state.show});
     }

     
    render() { 
       
        return ( 
            <>
               
               
            {/* <div class="inner" >  */}
         
            <h1 style ={{color:"darkGrey"}}> My Todos</h1>
            
                        
         {/*  <input type='text' name ='todo' onChange ={this.handleChange} value={this.state.text} placeholder ='add todo here'/>*/}
            <div className ="maintodo">
                <label> Todo Name
            <select value={this.state.title} id="dropdown"  onChange={this.handleDropdownChange}>
            <option value="N/A">Select todo</option>
              <option value="Buy milk and eggs">Buy milk and eggs</option>
              <option value="Finish pending tasks">Finish pending tasks</option>
              <option value="update resume">Update resume</option>
              <option value="finish tutorial">Finish tutorial</option>
              <option value="Do Laundry">Do Laundry</option>
              <option value="Get Mails">Get Mails</option>
              <option value="Test Website">Test website</option>
              <option value="pay bills">Pay Bills</option>
              <option value="Finish todo user story">Finish todo user story</option>
            </select>
            </label>
            </div>

            <div onChange={this.onChangeValue}>
                <label> Todo type
        <input type="radio" value="work" checked={this.state.selectedOption === "work"} onChange={this.handleOptionChange} name="WorkType" /> Work
        <input type="radio" value="personal" checked={this.state.selectedOption === "personal"} onChange={this.handleOptionChange}  name="WorkType" /> Personal
       
        </label>
      </div>
           
         <label>Start date  <DatePicker selected={this.state.startTodoDate} onChange={this.handleStartDateChange}></DatePicker></label>
         <label>End date  <DatePicker selected={this.state.endTodoDate} onChange={this.handleEndDateChange}></DatePicker></label>
         <label>
          Description:
          <textarea value={this.state.textareaValue} onChange={this.handleTextAreaChange} />
        </label>


           <div className = "todobutton">
            <button style ={{background:"lightCyan"}} onClick={ this.addTodo}>Add Todo</button> 
            <button style ={{background:"lightCyan"}} onClick={this.cancelTodo}>Cancel</button>
           <p> <span>{this.state.error}</span></p>
           </div>
          
                {/*</div>*/}
                <Modal onClose={this.showModal} show={this.state.show}/>
                </>
            
         );
    }

    showModal = e => {
        console.log("close called in home");
        this.setState({
          show: !this.state.show
        });
      };


    cancelTodo = () =>{

        this.setState({ error:'',
        title: "select todo",
        completed:false,
        startTodoDate : new Date(),
        endTodoDate : new Date(),
        textareaValue: " ",
        selectedOption : "personal"})

        console.log("todo cancelled");
    }

    addTodo = () =>{
    

     const task = {title : this.state.title,
                  completed : false,
                  startTodoDate: this.state.startTodoDate,
                  endTodoDate :this.state.endTodoDate,
                  description: this.state.textareaValue,
                  todoType: this.state.selectedOption


                }

                console.log(task);
     if((!isNaN(task.title)) && (task.title.length >0)){
        this.setState({error: 'input cannot be a number'});
     }
     else if(task.title && (task.title.length >0)){
         console.log("adding todos")
         axios.post(`http://localhost:4000/todos`,task)
         .then(res =>{
             if(res.data){
                 console.log("got todos",res.data);
               //  alert("Todo added!!")
               this.setState({ show:!this.state.show})
               
                 this.setState({
                     text:'',
                     title:"select todo",
                    completed:false,
                    startTodoDate : new Date(),
                    endTodoDate : new Date(),
                    textareaValue: " ",
                    selectedOption : "personal",
                   

                    

                 })
              

             }
         }).catch(err => console.log(err));
     } else{
        this.setState({error: 'invalid input'});
     }

    }

  
    handleDropdownChange = (e) =>{


        this.setState({title:e.target.value})
        console.log(e.target.name);
        if(!e.target.value){
            this.setState({error:''})
        }
    }

    handleStartDateChange = (date) =>{

        this.setState({startTodoDate: date})

    }

    handleEndDateChange = (date) =>{

        this.setState({endTodoDate: date})
        console.log(date);

    }

    handleTextAreaChange =(e) =>{

        this.setState({textareaValue:e.target.value})

    }

    handleOptionChange =(e) =>{
        this.setState({
            selectedOption: e.target.value
        })
    }

    onChangeValue(event) {
        console.log(event.target.value);
        console.log(event.target.name);
      }
}
 
export default Todo ;