import React from 'react';
import "./EditModal.css";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DatePickerComponent from './DatePickerComponent';
class EditModal extends React.Component{

    state= {
        todoItems: []
    }


    componentDidMount(){
        console.log("edit modalcomponent mounted")
        this.setState({todoItems:this.props.myProp})

        console.log(this.state.todoItems.title);
        console.log(this.state.todoItems.startTodoDate);
        
    }



    onClose = e => {
       this.props.onClose && this.props.onClose(e);
    
     console.log("close called in modal");
      };

      
    render(){
        if(!this.props.show){
            return null;
        }
      
        return(
            <div className ="editmodal" id="editmodal">
              
                <h1> EDIT TODO</h1>
                <div className ="maintodo">
                <label> Todo Name
                     <input type="text" value={this.props.myProp.title} id="dropdown" readOnly >
                         
             
                     </input>
                 </label>
                </div>
               
                <div onChange={this.onChangeValue}>
                <label> Todo type
                    <input type="radio" value="work" checked={this.props.myProp.selectedOption === "work"} onChange={this.props.handleOptionChange} name="WorkType" /> Work
                     <input type="radio" value="personal" checked={this.props.myProp.selectedOption === "personal"} onChange={this.props.handleOptionChange}  name="WorkType" /> Personal
       
                 </label>
                 </div>
                 <div className="dateEdit1">
                 <label>Start date  <DatePicker selected={moment(this.props.myProp.startTodoDate).toDate()}  startDate={this.props.myProp.startTodoDate} customInput={<DatePickerComponent />}
                  placeholderText="select Date" onChange={this.props.handleStartDateChange} ></DatePicker></label>
                  </div>
                  <div className ="dateEdit2">
                 <label>End  date  <DatePicker selected={moment(this.props.myProp.endTodoDate).toDate()} startDate={this.props.myProp.startTodoDate} customInput={<DatePickerComponent />}
                endDate={this.props.myProp.endTodoDate} minDate={new Date()} onChange={this.props.handleEndDateChange} ></DatePicker></label>
                    </div>
               <div>
                 <label>
                  Description:
                 <textarea value={this.props.myProp.textareaValue} onChange={this.props.handleTextAreaChange} />
                 </label>

                    </div>
             <div className = "todobutton">
             <button style ={{background:"lightCyan"}} onClick={e =>{
                this.props.saveTodo(this.props.myProp.id)
                    this.onClose(e);

                }} >Save </button> 
                 {/* <button style ={{background:"lightCyan"}} onClick={this.cancelTodo}>Cancel</button>
                 <p> <span>{this.state.error}</span></p> */}
                 </div>
          
                 
               
                {/* <button onClick={e =>{
                    this.onClose(e);
                }}
                >close</button> */}
               
               
            </div>
        )
    }
} 




export default EditModal;