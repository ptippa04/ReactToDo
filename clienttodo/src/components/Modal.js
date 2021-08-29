import React from 'react';
import "./Modal.css";
class Modal extends React.Component{

    onClose = e => {
       this.props.onClose && this.props.onClose(e);
    
     console.log("close called in modal");
      };
    render(){
        if(!this.props.show){
            return null;
        }
      
        return(
            <div className ="modal" id="modal">
              
            {/*  <h2>Todo added!</h2>*/}

            <div>{this.props.children}</div>
               
               
                <button onClick={e =>{
                    this.onClose(e);
                }}
                >Ok</button>
              
               
            </div>
        )
    }
} 

export default Modal;