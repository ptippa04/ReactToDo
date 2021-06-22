import logo from './logo.svg';
import './App.css';

function App() {

  function addTodo(){

  }
  return (
   <div className='App'>
     <h1 style ={{color:"Red"}}> React Todo Application</h1>
     <input type='text' name ='todo' placeholder ='enter the text'/>
     
     <button onClick = {addTodo}>Add Todo</button>
   </div>
  );
}

export default App;
