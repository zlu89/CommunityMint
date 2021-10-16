import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginController from './LoginController';

//import NFTList from './NFTlist';
import LoginScreen from './LoginScreen';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      {/* <Route exact path='/' component={Home}></Route> */}
      <Route exact path='/' component={LoginController}></Route>
      {/*<Route exact path='/signup' component={Signup}></Route>*/}
    </Switch>
  );
}

export default Main;