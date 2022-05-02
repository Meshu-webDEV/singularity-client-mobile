import { useContext, useReducer } from 'react';

// Types
import {
  SET_SUBMITTING,
  SET_NEWEVENT_INITIAL_INFO,
  SET_NEWEVENT_POINTS,
  SET_NEWEVENT_PRIZE,
  SET_NEWEVENT_TEAMS,
  SET_CREATED_EVENT_ID,
  SET_SUCCESSFUL_SUBMIT,
  NEW_EVENT_RESET,
} from '../types';

// Context
import NewEventContext from './NewEventContext';
import NewEventReducer from './NewEventReducer';
import ToastContext from '../Toast/ToastContext';

// Other
import { useHistory } from 'react-router-dom';
import { backendAPI } from '../../lib/backend';
import { isPast } from '../../lib/utils';
import { flatten, isEmpty, merge } from 'lodash';
import EventContext from '../Event/EventContext';

const NewEventState = props => {
  const initialState = {
    template: true,
    createdEventId: '',
    initialInfo: {},
    teams: {},
    points: {},
    prize: {},
    isSubmitting: true,
    successfulSubmit: false,
  };

  // History
  let history = useHistory();

  // Context
  const { setToast } = useContext(ToastContext);
  const { setEvent } = useContext(EventContext);

  const [state, dispatch] = useReducer(NewEventReducer, initialState);

  const createEvent = async (
    event,
    errors,
    isValid,
    setValues,
    initialValues
  ) => {
    // if (isPast(event.datetime))
    //   return setToast({
    //     variant: 'error',
    //     message: 'Event date cannot be in the past',
    //   });

    if (!isValid || isPast(event.datetime))
      return setToast({
        variant: 'error',
        message: [
          "Can't create an event. Error/s:",
          ...helperGetArrayOfErrors(errors),
          isPast(event.datetime) ? `Event date cannot be in the past` : '',
        ],
        duration: 8000,
      });

    // event is valid
    try {
      setEvent({});
      console.log(event);
      history.replace('/dashboard/new-event/status');
      const { data } = await backendAPI.post('/events/new', event);

      // clean-up new-event page
      setValues(initialValues);

      // Set new event ID
      dispatch({ type: SET_CREATED_EVENT_ID, payload: data });
      dispatch({ type: SET_SUBMITTING });
      // dispatch successfulSubmit: true
      dispatch({ type: SET_SUCCESSFUL_SUBMIT, payload: true });
    } catch (error) {
      dispatch({ type: SET_SUBMITTING });
      // dispatch successfulSubmit: false
      dispatch({ type: SET_SUCCESSFUL_SUBMIT, payload: false });
      setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, Error occurred while trying to create your event. try again or contact us.',
      });
    }
  };

  const resetState = () => {
    dispatch({
      type: NEW_EVENT_RESET,
      payload: initialState,
    });
  };

  const getTemplate = uniqueid => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('getting template');
        const { data } = await backendAPI.get(`/templates/${uniqueid}`);
        resolve(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const helperGetArrayOfErrors = (errors = []) => {
    const errorKeysToReadableMap = [
      { 'name': 'Event name' },
      { 'teams': 'Participating teams' },
      { 'pointsDistribution': 'Points Distribution' },
      { 'pointPerKill': 'Points Per kill' },
      { 'prizepool': 'Total prizepool' },
      { 'prizepoolDistribution': 'Prizepool Distribution' },
    ];

    const errorNames = Object.keys(errors).map(k => {
      return errorKeysToReadableMap.find(readableError => {
        return Object.keys(readableError)[0] === k;
      });
    });

    const errorSections = errorNames.map(e => Object.values(e)[0]);

    console.log('Errors:');
    console.log(errorSections);

    return errorSections;
  };

  const handleNewEventInfo = (info, field) => {
    switch (field) {
      case 'initialInfo':
        return dispatch({ type: SET_NEWEVENT_INITIAL_INFO, payload: info });
      case 'teams':
        return dispatch({ type: SET_NEWEVENT_TEAMS, payload: info });
      case 'points':
        return dispatch({ type: SET_NEWEVENT_POINTS, payload: info });
      case 'prize':
        return dispatch({ type: SET_NEWEVENT_PRIZE, payload: info });
      default:
        return;
    }
  };

  return (
    <NewEventContext.Provider
      value={{
        isSubmitting: state.isSubmitting,
        successfulSubmit: state.successfulSubmit,
        createdEventId: state.createdEventId,
        initialInfo: state.initialInfo,
        teams: state.teams,
        points: state.points,
        prize: state.prize,
        event: state.event,
        handleNewEventInfo,
        getTemplate,
        createEvent,
        resetState,
      }}
    >
      {props.children}
    </NewEventContext.Provider>
  );
};

export default NewEventState;
