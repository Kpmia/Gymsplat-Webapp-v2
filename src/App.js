import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import User from 'pages/User'
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Cookies from 'universal-cookie'
import StaffTeam from 'pages/StaffTeam'

const cookies = new Cookies()

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const Reports = React.lazy(() => import('pages/TablePage'));
const ActivityPage = React.lazy(() => import('pages/ActivityPage'));
const Reservations = React.lazy(() => import('pages/Reservations'));
const Feedback = React.lazy(() => import('pages/Feedback'));
const UserProfile = React.lazy(() => import('pages/UpdateUserInfo'));
const MemberPage = React.lazy(() => import('pages/User'));
const MemberProfile = React.lazy(() => import('pages/UpdateMemberInfo'))
const Staff = React.lazy(() => import('pages/StaffTeam'));
// const AuthForm = React.lazy(() => import('components/AuthForm'));


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('userIdManager')
      ?  <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('userIdManager')
      ?  <Redirect to='/dashboard' />
      : <Component {...props} />
  )} />
)

const NotFoundRedirect = () => <Redirect to='/not-found' />

const NotFound = () => <div>Not found</div>

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


class App extends React.Component {

  

  render() {
    
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>

            <LoginRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />

          <LayoutRoute
              exact
              path="/members"
              layout={EmptyLayout}
              component={props => (
                <User {...props} authState />
              )}
            />

            <LayoutRoute
              exact 
              path="/" 
              layout={EmptyLayout} 
              component={props => (
                <Redirect to="/login"/>
              )}
              />


            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                <PrivateRoute exact path="/reports" component={Reports} />
                <PrivateRoute exact path="/activity" component={ActivityPage} />
                <PrivateRoute exact path="/reservations" component={Reservations} />
                <PrivateRoute exact path="/feedback" component={Feedback} />
                <PrivateRoute exact path="/userprofile" component={UserProfile}/>
                <PrivateRoute exact path="/memberprofile" component={MemberProfile}/>
                <PrivateRoute exact path="/staff" component={StaffTeam}/>


              </React.Suspense>
            </MainLayout>
            <Redirect exact path="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
