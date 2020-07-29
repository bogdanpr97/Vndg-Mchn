import React, { Fragment } from 'react';
import { Route, Switch  } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar/Navbar';
import Main from './components/layout/Main/Main';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import AddItem from './components/addPage/AddItem/AddItem';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={AddItem} />
      </Switch>
    </Fragment>
  );
}

export default App;
