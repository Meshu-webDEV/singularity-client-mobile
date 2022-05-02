import { useState, useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Components
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import EventCard from '../../Components/layouts/EventCard';
import Header from '../../Components/layouts/Header';

// MUI
import { CircularProgress } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

// GSAP
import { Tween } from 'react-gsap';

// Context
import AuthContext from '../../Context/Auth/AuthContext';
import DashboardContext from '../../Context/Dashboard/DashboardContext';
import FormikEventContext from '../../Context/Formik/FormikEventContext';
import IntegrationsState from '../../Context/Integrations/IntegrationsState';

// State
import TeamsState from '../../Context/Teams/TeamsState';
import NewEventState from '../../Context/New-event/NewEventState';
import EventsState from '../../Context/Events/EventsState';

// Sub-pages
import NewEvent from './NewEvent';
import NewEventPreview from './NewEventPreview';
import NewEventStatus from './NewEventStatus';
import MyIntegrations from './MyIntegrations';

// Utils
import sortArray from 'sort-array';
import { isEmpty } from 'lodash';
import MyTemplates from './MyTemplates';
import TemplatesState from '../../Context/Templates/TemplatesState';
import MyEvents from './MyEvents';
import MyEventsState from '../../Context/My-Events/MyEventsState';
import MyProfile from './MyProfile';
import ProfileState from '../../Context/Profile/ProfileState';
import MyOrganization from './MyOrganization';
import OrganizationState from '../../Context/Organization/OrganizationState';
import FormikEventsFilterContext from '../../Context/Formik/FormikEventsFilterContext';
import FormikTemplatesFilterContext from '../../Context/Formik/FormikTemplatesFilterContext';

const Dashboard = () => {
  let match = useRouteMatch();
  let location = useLocation();

  const { username } = useContext(AuthContext);
  const { getRecentEvents, recentEvents, isLoading } =
    useContext(DashboardContext);

  useEffect(() => {
    if (!isEmpty(recentEvents) || location.pathname !== '/dashboard') return;
    getRecentEvents();
  }, [location.pathname]);

  return (
    <TeamsState>
      <NewEventState>
        <FormikEventContext initial>
          <Switch>
            <Route exact path={`${match.path}/new-event/preview`}>
              <NewEventPreview />
            </Route>
            <Route exact path={`${match.path}/new-event/status`}>
              <NewEventStatus />
            </Route>
            <Route exact path={`${match.path}/new-event`}>
              <NewEvent />
            </Route>
          </Switch>
        </FormikEventContext>
        <Switch>
          <Route path={`${match.path}/my-events`}>
            <FormikEventsFilterContext>
              <MyEventsState>
                <MyEvents />
              </MyEventsState>
            </FormikEventsFilterContext>
          </Route>
          <Route path={`${match.path}/my-profile`}>
            <ProfileState>
              <OrganizationState>
                <MyProfile />
              </OrganizationState>
            </ProfileState>
          </Route>
          <Route path={`${match.path}/my-templates`}>
            <FormikTemplatesFilterContext>
              <TemplatesState>
                <MyTemplates />
              </TemplatesState>
            </FormikTemplatesFilterContext>
          </Route>
          <Route path={`${match.path}/my-integrations`}>
            <IntegrationsState>
              <MyIntegrations />
            </IntegrationsState>
          </Route>
          <Route path={`${match.path}/my-organization`}>
            <OrganizationState>
              <MyOrganization />
            </OrganizationState>
          </Route>
          <Route exact path='/dashboard'>
            <DashboardView
              recentEvents={recentEvents}
              isLoading={isLoading}
              username={username}
            />
          </Route>
        </Switch>
      </NewEventState>
    </TeamsState>
  );
};

const DashboardView = ({ recentEvents, isLoading, username }) => {
  let match = useRouteMatch();
  let location = useLocation();
  const renderRecentGames = () => {
    if (isEmpty(recentEvents)) return <EventCard placeholder />;

    sortArray(recentEvents, {
      by: 'status',
    });

    return recentEvents.map(event => (
      <EventCard
        key={event.uniqueid}
        uniqueid={event.uniqueid}
        datetime={event.datetime}
        name={event.name}
        rounds={event.rounds}
        currentRound={event.currentRound}
        status={event.status}
        hasPrizepool={event.hasPrizepool}
        prizepool={event.prizepool}
        prizepoolCurrency={event.prizepoolCurrency}
        isPublic={event.isPublic}
      />
    ));
  };

  return (
    <MobileBaseLayout
      header={<Header />}
      title={`${username}'s Dashboard`}
      navigation={false}
    >
      <div className='flex flex-col flex-grow'>
        {/* Recent games */}
        <div className='h-full flex flex-col pb-5  text-whites-light relative  bg-dark-background'>
          {/* Events carousel */}
          <div className='relative w-full flex flex-col'>
            {recentEvents.length ? (
              <span className='text-xxs transform top-full -translate-y-full mt-3 right-0 -translate-x-1/4 tracking-tighter font-light  text-whites-dark opacity-60 absolute'>
                tap to go to the event page
              </span>
            ) : (
              ''
            )}
            <div className='w-full flex justify-between font-light items-end text-xs tracking-tight leading-tight opacity-90'>
              <span>my recent events</span>
              <Link
                to='/dashboard/my-events'
                className='text-xxs font-light pr-2'
              >
                more..
              </Link>
            </div>
            <div
              style={{
                minHeight: '169px',
              }}
              className='relative flex space-x-4 py-3 flex-nowrap flex-shrink-0 px-0.5 w-auto overflow-x-scroll'
            >
              {isLoading ? (
                <div
                  style={{
                    height: '145px',
                  }}
                  className='px-3 pt-5 pb-2 w-full relative flex justify-center items-center flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-3xl rounded-b-3xl '
                >
                  <CircularProgress variant='indeterminate' color='secondary' />
                </div>
              ) : (
                renderRecentGames()
              )}
            </div>
          </div>
        </div>
        {/* Creat a new event */}
        <div className='relative w-screen  bg-grays-dark py-1.5 mb-3 -mx-3.5'>
          <Tween
            stagger={0.25}
            duration={0.75}
            ease='elastic.out(0.1, 0.4)'
            from={{ x: '100vh' }}
          >
            <div className=' bg-dark-background -mx-5 transform -translate-x-1/3 rounded-r-3xl w-screen h-24'></div>
            <div className='absolute w-52  text-whites-light left-1/2 transform top-1/2 -translate-y-1/2 -translate-x-1/2 z-30'>
              <Link to={`/dashboard/new-event`}>
                <div className='h-10 flex self-end'>
                  <span className='rounded-l-2xl text-sm shadow-tinycard tracking-tight flex justify-center items-center  bg-dark-backgroundDark py-5 px-3'>
                    Create a new event
                  </span>
                  <div className='rounded-r-2xl flex justify-center items-center shadow-tinycard  bg-grays-light py-5 px-2.5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      viewBox='0 0 28 28'
                    >
                      <circle
                        id='Ellipse_70'
                        cx='14'
                        cy='14'
                        r='14'
                        fill='#0b0d13'
                      />
                      <g id='Group_1579' transform='translate(6.373 4.359)'>
                        <path
                          className='opacity-90'
                          id='Path_20'
                          d='M876.677,260.8a2.843,2.843,0,0,0,2.117,2.748l-3.32,3.32a8.45,8.45,0,0,1-1.1-.929,8.609,8.609,0,0,1-1.2-10.691,8.009,8.009,0,0,1,1.2-1.514,8.616,8.616,0,0,1,10.268-1.459l-5.75,5.75A2.847,2.847,0,0,0,876.677,260.8Z'
                          transform='translate(-871.844 -251.206)'
                          fill='#df003c'
                        />
                        <g id='Group_1474' transform='translate(2.667 3.625)'>
                          <path
                            className='opacity-90'
                            id='Path_21'
                            d='M896,280.07a8.032,8.032,0,0,1-1.2,1.514,8.616,8.616,0,0,1-10.268,1.457l5.929-5.927a2.845,2.845,0,0,0-.034-5.395l3.269-3.269a8.174,8.174,0,0,1,1.1.929A8.612,8.612,0,0,1,896,280.07Z'
                            transform='translate(-884.53 -268.45)'
                            fill='#df003c'
                          />
                        </g>
                      </g>
                      <circle
                        id='Ellipse_71'
                        cx='1.431'
                        cy='1.431'
                        r='1.431'
                        transform='translate(12.568 12.568)'
                        fill='#f10041'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </Tween>
        </div>
        {/* Sub-pages */}
        <div className='flex flex-col flex-grow space-y-2 w-full items-center py-1 h-full '>
          <div className='flex space-x-7'>
            {/* My events */}
            <Link
              to={`${match.path}/my-events`}
              className='rounded-xl bg-dark-background  text-primary-light text-sm shadow-md py-2 flex flex-col justify-center space-y-3 items-center w-32 h-28'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-8'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-xxs text-whites-light font-medium tracking-wide'>
                My events
              </span>
            </Link>
            {/* My organization */}
            <Link
              to={`${match.path}/my-organization`}
              className='rounded-xl bg-dark-background subpixel-antialiased text-primary-light text-sm shadow-md py-2 flex flex-col justify-center space-y-3 items-center w-32 h-28'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-xxs text-whites-light font-medium tracking-wide'>
                My organization
              </span>
            </Link>
          </div>
          <div className='flex space-x-7'>
            {/* My templates */}
            <Link
              to={`${match.path}/my-templates`}
              className='rounded-xl bg-dark-background  subpixel-antialiased text-primary-light text-4xl leading-none shadow-md py-2 flex flex-col justify-center space-y-3 items-center w-32 h-28'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                <path
                  fillRule='evenodd'
                  d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-xxs font-medium text-whites-light tracking-wide'>
                My templates
              </span>
            </Link>
            {/* My integrations */}
            <Link
              to={`${match.path}/my-integrations`}
              style={{ fontSize: '2rem' }}
              className='rounded-xl bg-dark-background subpixel-antialiased text-primary-light leading-none  shadow-md py-2 flex flex-col justify-center space-y-3 items-center w-32 h-28'
            >
              <span className='transform rotate-45 filter brightness-110'>
                <LinkIcon fontSize='inherit' />
              </span>
              <span className='text-xxs font-medium text-whites-light tracking-wide'>
                My integrations
              </span>
            </Link>
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default Dashboard;
