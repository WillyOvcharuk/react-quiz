import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/quiz/quiz'
import {connect} from 'react-redux'

import {Route, Switch, withRouter} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Logout from './components/Logout/Logout'

import {Redirect} from 'react-router-dom'




class App extends Component {

  componentDidMount() {
    this.props.authLogin()
  }

  render() {
    let routes = ( 
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Redirect to={'/'}/>
      </Switch>
    )
      if (this.props.isAuthenticated) {
        let routes = (
          <Switch>
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/" component={QuizList} />
            <Route path="logout" component={Logout} />
            <Redirect to={'/'}/>
          </Switch>
        )
      }
      return (
        <Layout>
          { routes }
        </Layout>
      );

  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: () => dispatch(authLogin())
  }
}

export default withRouter(connect(mapStateToProps)(App));
