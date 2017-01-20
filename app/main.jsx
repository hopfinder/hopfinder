'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Navbar from './components/Navbar'
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'


import { Home, Auth, News } from './routes';


/*
 * This will load our own custom stylesheet(sass) file on the project 
 * =============================
 */
require('./stylesheets/style.scss')


/*
 * This is react lib which allows us to use hammer.js
 * =============================
 * https://github.com/JedWatson/react-hammerjs
 */


// const Root = ({ user, children, location }) => {
//   /*
//    * Uncomment two lines below and 
//    * change the argument of this const to props for 
//    * console.log all props that are being passed down
//    * ================================================
//    */
//    // console.log('Root PROPS: ', props)
//    // const { user, children, location } = props

//   // if user is not logged in - open auth page 
//   // or - open child route component
//   return ( 
//       <div>
//         <Navbar location={location} />
//         { children }
//       </div> 
//     )
// }

import { whoami } from './reducers/auth';

class Root extends React.Component {
  constructor(props) {
    super(props);    
  }
  componentDidMount() {
    const { user, whoami, location } = this.props;
    console.log('componentDidMount WHO AM I????')
    whoami();
    if(!user && location.pathname !== "/auth") {
      browserHistory.push('/auth')
    }
  }
  render(){
    const { children, location, user } = this.props
    return ( 
      <div>
        <Navbar location={location} />
        { children }
      </div> 
    )
  }
}


const App = connect(
  // states
  ({ auth }) => ({ user: auth }),
  // dispatches
  { whoami }
)(Root)

// const requireAuth = (nextState, transition) => {
//   console.log('requireAuth NEXT STATE', nextState)
//   console.log('requireAuth TRANSITION', transition)
//   store.dispatch(whoami())
//   // if(store && !store.getState().auth){
//   //   transition('/auth', null, {
//   //     nextPathname: nextState.location.pathname
//   //   });
//   // }  
// }

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/feed" component={News} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)