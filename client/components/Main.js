import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import Session from './Session';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/home' component={HomeScreen} />
        <Route path='/session' component={Session} />
      </Switch>
    );
  }
}
