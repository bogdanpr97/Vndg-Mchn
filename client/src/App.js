import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar/Navbar';
import Main from './components/layout/Main/Main';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import AddItem from './components/addPage/AddItem/AddItem';
import Alert from './components/reusables/Alert';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <Alert />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={AddItem} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
