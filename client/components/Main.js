import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import HomeScreen from './HomeScreen';
import Session from './Session';
import MatchedMovies from './MatchedMovies';

import test from './test';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path='/home' component={HomeScreen} />
        <Route path='/session' component={Session} />
        <Route path='/matchedmovies' component={MatchedMovies} />
        <Route path='/moviecardTest' component={test} />
      </Switch>
    );
  }
}
