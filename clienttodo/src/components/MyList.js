import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

class MyList extends Component{

    state = { 
        todoItems:[],
        completed:false,
      
     }

       componentDidMount(){
         console.log("component mounted")
         this.getTodos();
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


     setUpdate =(updatedTitle,id) =>{

        let task ={title: updatedTitle,
                    id:id}
                    if(task.title && (task.title.length >0)){
                        console.log("updating todos")
                        axios.post(`http://localhost:4000/todos/${id}`,task)
                        .then(res =>{
                            if(res.data){
                                console.log("got updated todos")
                                console.log(res.data);

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


    render(){

        return (
            <div>
                 <ul>
          
          {this.state.todoItems.map(todo =>{ return(

               <TodoItem key={todo._id} todo={todo}  checked={todo.completed} checkboxUpdateProps={this.checkboxHandleChange} setUpdate={this.setUpdate} deleteTodoProps={this.deleteTodo}/>
             
              
           
           )})}
           </ul>
            </div>
        )
    }

}

export default MyList