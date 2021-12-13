import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import HomeScreen from './HomeScreen';
import Session from './Session';

export default class Main extends Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route path='/home' component={HomeScreen} />
            <Route path='/session' component={Session} />
          </Switch>
        </main>
      </div>
    );
  }
}
