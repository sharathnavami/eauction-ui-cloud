import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './component/navigation';
import Seller from './component/seller/seller';
import Login from './component/login/login';
import UseToken from './component/util/useToken';
import Dashboard from './component/dashboard/dashboard';
import Buyer from './component/buyer/buyer';
import Admin from './component/admin/admin';
import GuardedRoute from './component/util/authGuard';

function App() {

  const { token, setToken,deleteToken } = UseToken();
  console.log("token: " + token + " setToken: " + setToken);

  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className='wrapper'>
      <Navigation />
      <div className='container'>
        <Switch>
          <GuardedRoute exact path='/' component={Dashboard} auth={localStorage.getItem('token')}/>
          {
            localStorage.getItem('user_type')=='seller' &&
            <GuardedRoute path='/seller' component={Seller} auth={localStorage.getItem('token')}/>
          }
          {
            localStorage.getItem('user_type')=='buyer' &&
            <GuardedRoute path='/buyer' component={Buyer} auth={localStorage.getItem('token')}/>
          }
          {
            localStorage.getItem('user_type')=='admin' &&
            <GuardedRoute path='/admin' component={Admin} auth={localStorage.getItem('token')}/>
          }
        </Switch>
      </div>
    </div>
  );
}

export default App;