import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import moment from 'moment';
import EditModal from './EditModal';
import format from "date-fns/format";
import Modal from './Modal';

class MyList extends Component{

    state = { 
        todoItems:[],
        completed:false,
        show : false,
        sort:{
            column:null,
            direction: 'desc'
        },

        editshow: false,
        editList:{
        title: "select todo",
        startTodoDate : new Date(),
        endTodoDate : new Date(),
        textareaValue: " ",
        selectedOption : "personal",
        id:""
        }
      
     }

       componentDidMount(){
         console.log("component mounted")
         this.getTodos();
     }

     showModal = () =>{
      this.setState({show:!this.state.show});
  }

    getTodos = () =>{

        axios.get(`http://localhost:4000/todos`)
        .then(res =>{

           console.log("got todos from mongo",res.data);
            const todoItems = res.data;
            this.setState({todoItems});
            this.setState({error:'',text:''})
        }).catch( err =>{
            console.log("could not get data");
        });
     }

     showeditModal = e => {
      console.log("close called in home");
      this.setState({
        editshow: !this.state.editshow,
         show:!this.state.show
       
      });
    };

    showModal = e => {
      console.log("close called in home");
      this.setState({
        show: !this.state.show
      });
    };


     editTodo =(id,todo) =>{

    

      this.setState({editshow: !this.state.editshow,
        
      });

      this.setState(prevState =>{
       
         
        let editList = Object.assign({},prevState.editList);
        editList.title = todo.title;
        editList.startTodoDate =todo.todoStartDate;
        editList.endTodoDate = todo.todoEndDate;
        editList.textareaValue= todo.todoDescription;
        editList.selectedOption = todo.todoType;
        editList.id = todo._id;
        console.log(editList);


        return {editList};

      })

      console.log(this.state.editList);

    //     let task ={title: updatedTitle,
    //                 id:id}
    //                 if(task.title && (task.title.length >0)){
    //                     console.log("updating todos")
    //                     axios.post(`http://localhost:4000/todos/${id}`,task)
    //                     .then(res =>{
    //                         if(res.data){
    //                             console.log("got updated todos")
    //                             console.log(res.data);

    //                            if(res.data.title === updatedTitle){
    //                                console.log("same titles")
    //                             this.setState({

    //                                 todoItems: this.state.todoItems.map(todo => {
    //                                     if (todo._id === id) {
    //                                         console.log("setting title")
    //                                       todo.title = updatedTitle
    //                                     }
    //                                     return todo
    //                                   })
                                   
    //                             });
    //                         }

                                
               
    //                         }
    //                     }).catch(err => console.log(err));
    //                 }



      }

      saveTodo = (id,todo) =>{

        console.log("satrtdate"+this.state.editList.startTodoDate);
        console.log("enddate"+this.state.editList.endTodoDate);
        console.log("type",this.state.editList.selectedOption);
        console.log("textarea",this.state.editList.textareaValue);


        let startTodoDate = (this.state.editList.startTodoDate)? todo.startTodoDate : this.state.editList.startTodoDate;
        let endTodoDate = (this.state.editList.endTodoDate)? todo.endTodoDate : this.state.editList.endTodoDate;
        let todoType =  (this.state.editList.selectedOption == "")? todo.todoType : this.state.editList.selectedOption;

        let description = (this.state.editList.textareaValue == "")? todo.description : this.state.editList.textareaValue;

        const task = {title : this.state.title,
          completed : false,
          startTodoDate:startTodoDate ,
          endTodoDate :endTodoDate,
          description: description,
          todoType: todoType,
          id: id



        }
        axios.put(`http://localhost:4000/todos/${id}`,task)
                            .then(res =>{
                                if(res.data){
                                    console.log("gotedit  updated todos")
                                    console.log(res.data);

                                   this.getTodos();
    
                                    
                   
                                }
                            }).catch(err => console.log(err));


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
                           // todo.completed = res.data.completed;


                        }
                    })
                    .catch(err => console.log(err));


                }
                return todo;
            })
        });
    }

    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.todoItems.sort((a, b) => {
          if (column === 'title' ) {
            const tA = a.title.toUpperCase(); 
            const tB = b.title.toUpperCase(); 
            if (tA < tB) {
              return -1;
            }
            if (tA > tB) {
              return 1;
            }
    
            // names must be equal
            return 0;
          }
        else if(column === 'todoStartDate' ){
             const dA = new Date(a.todoStartDate);
             const dB = new Date(b.todoStartDate);
             console.log("dates"+dA+" and "+dB);
             if(dA < dB)
             return 1;
             else if(dA > dB)
             return -1;
             else
             return 0;

        } else if(column === 'todoType') {
            const tA = a.todoType.toUpperCase(); 
            const tB = b.todoType.toUpperCase(); 
            if (tA < tB) {
              return -1;
            }
            if (tA > tB) {
              return 1;
            }
    
            
            return 0;


        } else if(column === 'todoEndDate' ){
            const dA = new Date(a.todoEndDate);
            const dB = new Date(b.todoEndDate);
            console.log("dates"+dA+" and "+dB);
            if(dA < dB)
            return 1;
            else if(dA > dB)
            return -1;
            else
            return 0;

       }
        });
          
        if (direction === 'desc') {
          sortedData.reverse();
        }
        
        this.setState({
          data: sortedData,
          sort: {
            column,
            direction,
          }
        });
      };

      setArrow = (column) => {
        let className = 'sort-direction';
        
        if (this.state.sort.column === column) {
          className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
        }
        
        console.log(className);
        
        return className;
      };

      handleStartDateChange = (date) =>{
        console.log("date is"+date);
  
          this.setState({
            editList:{
              ...this.state.editList,startTodoDate: date}
            });
  
      }
  
      handleEndDateChange = (date) =>{
  
        this.setState({
          editList:{
            ...this.state.editList,endTodoDate: date}
          });
  
      }
  
      handleTextAreaChange =(e) =>{
  
        //  this.setState({textareaValue:e.target.value})

        this.setState({
          editList:{
            ...this.state.editList,textareaValue:e.target.value}
          });
  
      }
  
      handleOptionChange =(e) =>{
        console.log("handle option chnage called");
          // this.setState({
          //     selectedOption: e.target.value
          // })

          this.setState({
            editList:{
              ...this.state.editList,selectedOption: e.target.value}
            });

        
      }


    render(){

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                          <th></th>
                        <th onClick={this.onSort('title')}> Todo Name
                        {/*<span className={this.setArrow('title')}></span>*/}</th>
                        <th onClick={this.onSort('todoType')}>Todo Type</th>
                        <th>Description</th>
                        <th onClick={this.onSort('todoStartDate')}>Start Date</th>
                        <th onClick={this.onSort('todoEndDate')}>End Date</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                      {  this.state.todoItems.map(todo => { return(
                          <tr key ={todo._id}>
                            <td><input type="checkbox" className="checkbox" checked={ todo.completed} onChange={()=>this.checkboxHandleChange(todo._id)}/></td>
                              <td>{todo.title}</td>
                              <td>{todo.todoType}</td>
                              <td>{todo.todoDescription}</td>
                              <td>{moment(todo.todoStartDate).format("LL")}</td>
                              <td>{moment(todo.todoEndDate).format("LL")}</td>
                        
                              <td>{(todo.completed)? "done": "pending"}</td>
                              <td> <button style ={{background:"green"}} onClick = { () => this.deleteTodo(todo._id) }>Delete</button></td>
                             <td> <button style ={{background:"lightBlue"}} onClick = { () => this.editTodo(todo._id,todo) }>Edit
                             </button> <EditModal onClose={this.showeditModal} myProp= {this.state.editList} 
                             handleOptionChange = {this.handleOptionChange}
                             handleStartDateChange = {this.handleStartDateChange}
                             handleEndDateChange = {this.handleEndDateChange}
                             handleTextAreaChange = {this.handleTextAreaChange}

                             saveTodo = {this.saveTodo}
                              show={this.state.editshow}/></td>
                            
                          </tr>
                          
                      )
                      })}
                    </tbody>


                </table>
                
                <Modal onClose={this.showModal} show={this.state.show}> Todo Saved!! </Modal>
      
        
            </div>
        )
    }

}



export default MyList