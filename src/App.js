import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';
//import Posts from './containers/Posts';

const Posts=React.lazy(()=>import('./containers/Posts'));

class App extends Component {
  state={
    show:false
  }

  modeHandler=()=>{
     this.setState(prevState=>{
       return {show:!prevState.show}
     });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <nav>
            <NavLink to="/">Home</NavLink> |&nbsp;
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>
          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />
          <Route path="/posts" render={()=><Suspense fallback={<div>Loading..</div>}><Posts /></Suspense>} />

          <button onClick={this.modeHandler}>Show Posts</button>
          {this.state.show? <Suspense fallback={<div>Loading..</div>}><Posts /></Suspense>:null}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
