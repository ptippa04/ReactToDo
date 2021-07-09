import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';
import About from './components/About';
import NotMatch from './components/NotMatch';
import NavBar from './components/NavBar';

import { Route, Switch } from "react-router-dom"


function App() {

  function addTodo(){

  }
  return (
   <div className="App">
      <NavBar />
            
     
     <Switch>
     <Route exact path="/">
     <div className="container">
     <Todo></Todo>
     </div>
     </Route>
     <Route path ="/about">
       <About/>
     </Route>
     <Route path ="*">
       <NotMatch/>
     </Route>
     </Switch>
   </div>
  );
}

export default App;
