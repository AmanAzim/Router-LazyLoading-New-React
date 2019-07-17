import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink, Redirect, Prompt } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';
//import Posts from './containers/Posts';

const Posts=React.lazy(()=>import('./containers/Posts'));

class App extends Component {
  state={
    show:false,
    authenticated:false
  }

  modeHandler=()=>{
     this.setState(prevState=>{
       return {show:!prevState.show}
     });
  }

  render() {
    return (
      <BrowserRouter basename="/my-app">
        <React.Fragment>
          <nav>
            <NavLink to="/">Home</NavLink> |&nbsp;
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>

          <Route path="/" component={Welcome} exact />

          {/*<Route path="/user" component={User} exact />*/}
          <Route path="/user" render={()=>{ return this.state.authenticated? <User />:  <Redirect to="/"/> }} />
          <Prompt when={!this.state.authenticated}
                  message={(location)=>{return location.pathname.startsWith('/user')? 'Are you logedin ?':true}}
          />
          <button onClick={()=>this.setState({authenticated:!this.state.authenticated})}>Login</button>


          <Route path="/posts" render={()=><Suspense fallback={<div>Loading..</div>}><Posts /></Suspense>} />

          <button onClick={this.modeHandler}>Show Posts</button>
          {this.state.show? <Suspense fallback={<div>Loading..</div>}><Posts /></Suspense>:null}

        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
