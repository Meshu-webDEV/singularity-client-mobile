import { isEmpty } from 'lodash';
import { useReducer } from 'react';
import {
  MODAL_SET,
  MODAL_OFF,
  MODAL_SET_COMPONENT,
  MODAL_SET_SIZE,
  MODAL_SET_SECONDARY_ACTION,
  MODAL_SET_VARIANT,
  MODAL_SET_TITLE,
  MODAL_SET_PRIMARY_ACTION,
  MODAL_RESET_STATE,
} from '../types';

import ModalContext from './ModalContext';
import ModalReducer from './ModalReducer';

const ModalState = props => {
  const initialState = {
    size: 'full',
    modalShow: false,
    modalProps: {
      title: 'Singularity',
      variant: 'success',
      action: {},
      secondary: {},
    },
    component: null,
  };

  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const setModalComponent = component => {
    dispatch({
      type: MODAL_SET_COMPONENT,
      payload: component,
    });
  };

  const setModalProps = ({
    title = 'Singularity',
    variant = 'dark',
    action,
    secondary,
  }) => {
    dispatch({
      type: MODAL_SET_TITLE,
      payload: title,
    });
    dispatch({
      type: MODAL_SET_VARIANT,
      payload: variant,
    });
    dispatch({
      type: MODAL_SET_PRIMARY_ACTION,
      payload: action,
    });
    dispatch({
      type: MODAL_SET_SECONDARY_ACTION,
      payload: secondary,
    });
  };

  /**
   *
   * @param {string} size either full or content
   */
  const setModal = size => {
    if (isEmpty(size))
      return dispatch({
        type: MODAL_SET,
      });

    dispatch({
      type: MODAL_SET_SIZE,
      payload: size,
    });
    dispatch({
      type: MODAL_SET,
    });
  };

  const offModal = () => {
    try {
      dispatch({
        type: MODAL_RESET_STATE,
        payload: initialState,
      });
      dispatch({
        type: MODAL_OFF,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        size: state.size,
        modalShow: state.modalShow,
        component: state.component,
        modalProps: state.modalProps,
        setModal,
        offModal,
        setModalProps,
        setModalComponent,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
