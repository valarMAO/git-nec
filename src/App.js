import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import Login from './page/login';
import store from './store';
import AuthorizedRoute from './router/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path='/login'  component={Login}></Route>
            <AuthorizedRoute path='/admin' />
            <Redirect exact from='/' to='/login' />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
