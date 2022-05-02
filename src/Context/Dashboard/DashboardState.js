import React, { useReducer } from 'react';
import { useContext } from 'react';
import { backendAPI } from '../../lib/backend';
import ToastContext from '../Toast/ToastContext';
import { SET_LOADING, SET_RECENT_EVENTS } from '../types';

import DashboardContext from './DashboardContext';
import DashboardReducer from './DashboardReducer';

const DashboardState = props => {
  const initialState = {
    recentEvents: [],
    isLoading: false,
  };

  const { setToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const getRecentEvents = async () => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const { data } = await backendAPI.get(`/events/my-recent-events`);

      dispatch({
        type: SET_RECENT_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, Error occurred while trying to get your recent events. try again or contact us.',
      });
    } finally {
      dispatch({
        type: SET_LOADING,
      });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        recentEvents: state.recentEvents,
        isLoading: state.isLoading,
        getRecentEvents,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
