import React, { useContext } from 'react';
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { AppContext, AppProvider } from './context/App';
import { Loading } from './components/Loading';
import { LoginRoute } from './routes/Login';
import { NotificationsRoute } from './routes/Notifications';
import { SettingsRoute } from './routes/Settings';
import { Sidebar } from './components/Sidebar';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col pl-14 h-full">
          <Loading />
          <Sidebar />

          <Switch>
            <PrivateRoute path="/" exact component={NotificationsRoute} />
            <PrivateRoute path="/settings" exact component={SettingsRoute} />
            <Route path="/login" component={LoginRoute} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
};
