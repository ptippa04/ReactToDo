import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';
import MyList from './components/MyList';
import NotMatch from './components/NotMatch';
import NavBar from './components/NavBar';
import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom"


class App extends Component{

  

  render(){
  
  return (
   <div className="App">
      <NavBar />
            
     
     <Switch>
     <Route exact path="/">
     <div className="container">
     <Todo></Todo>
     </div>
     </Route>
     <Route path ="/mylist">
       <MyList/>
     </Route>
     <Route path ="*">
       <NotMatch/>
     </Route>
     </Switch>
   </div>
  );
}
}

export default App;
