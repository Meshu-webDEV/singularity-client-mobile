import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';

// Pages
import Home from './Pages/Home';
import Join from './Pages/Join';
import Dashboard from './Pages/Dashboard';
import Events from './Pages/Events';
import NotFound from './Pages/NotFound';
import TransitionalLoading from './Pages/TransitionalLoading';
import Event from './Pages/Event';
import Templates from './Pages/Templates';
import EventSettings from './Pages/EventSettings';
import ActivateEmail from './Pages/ActivateEmail';

// Global components
import Toast from '../Global/Toast';
import Sidemenu from '../Global/Sidemenu';
import AppModal from '../Global/AppModal';

// State
import DashboardState from '../Context/Dashboard/DashboardState';
import EventsState from '../Context/Events/EventsState';

// Context
import OrganizerState from '../Context/Organizer/OrganizerState';
import AuthContext from '../Context/Auth/AuthContext';
import EventRoundUpdate from './Pages/EventRoundUpdate';
import FormikUpdateRoundsContext from '../Context/Formik/FormikUpdateRoundsContext';
import FormikEventsFilterContext from '../Context/Formik/FormikEventsFilterContext';
import FormikJoinContext from '../Context/Formik/FormikJoinContext';
import ForgetPassword from './Pages/ForgetPassword';
import FormikForgetPasswordContext from '../Context/Formik/FormikForgetPasswordContext';
import Organization from './Pages/Organization';
import OrganizationState from '../Context/Organization/OrganizationState';
import TemplatesState from '../Context/Templates/TemplatesState';
import FormikTemplatesFilterContext from '../Context/Formik/FormikTemplatesFilterContext';

const App = () => {
  //
  const location = useLocation();

  const { authState, isAuthorized, isAuthenticating } = useContext(AuthContext);

  useEffect(() => {
    const _isAuthorized = async () => {
      try {
        await isAuthorized();
      } catch (error) {}
    };
    if (!authState) _isAuthorized();
  }, []);

  if (isAuthenticating)
    return <TransitionalLoading text='Checking authentication state' />;

  return (
    <div className='relative w-screen overflow-hidden  bg-dark-background'>
      <Toast />
      <AppModal />
      <Sidemenu />
      <Switch>
        <Route path='/join'>
          {authState ? (
            <Redirect to='/dashboard' />
          ) : (
            <FormikJoinContext initial>
              <Join />
            </FormikJoinContext>
          )}
        </Route>
        <Route path='/activate-email'>
          {authState ? <Redirect to='/dashboard' /> : <ActivateEmail />}
        </Route>
        <Route path='/forget-password'>
          {authState ? (
            <Redirect to='/dashboard' />
          ) : (
            <FormikForgetPasswordContext>
              <ForgetPassword />
            </FormikForgetPasswordContext>
          )}
        </Route>
        <Route path='/dashboard'>
          {authState ? (
            <DashboardState>
              <Dashboard />
            </DashboardState>
          ) : (
            <Redirect to='/join' />
          )}
        </Route>
        <Route path='/explore'>
          <FormikEventsFilterContext>
            <OrganizerState>
              <EventsState>
                <Events />
              </EventsState>
            </OrganizerState>
          </FormikEventsFilterContext>
        </Route>
        <Route path='/templates'>
          <TemplatesState>
            <FormikTemplatesFilterContext>
              <Templates />
            </FormikTemplatesFilterContext>
          </TemplatesState>
        </Route>
        <Route path='/organization/:uniqueid'>
          <OrganizationState>
            <Organization />
          </OrganizationState>
        </Route>
        <Route path='/404'>
          <NotFound />
        </Route>
        <Route exact path='/:id'>
          <Event />
        </Route>
        <Route path='/:id/settings'>
          <EventSettings />
        </Route>
        <Route path='/:id/round/:round'>
          <FormikUpdateRoundsContext>
            <EventRoundUpdate />
          </FormikUpdateRoundsContext>
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
