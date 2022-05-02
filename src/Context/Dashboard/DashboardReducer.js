import { SET_LOADING, SET_RECENT_EVENTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case SET_RECENT_EVENTS:
      return {
        ...state,
        recentEvents: action.payload,
      };
    default:
      return state;
  }
};
