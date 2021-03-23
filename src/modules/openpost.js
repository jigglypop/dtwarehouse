import { createAction, handleActions } from 'redux-actions';

const UNSET_OPENPOST = 'opener/UNLOAD_OPENPOST';
const [OPENPOST] = 'opener/OPENPOST';
export const setOpenpost = createAction(OPENPOST, (openpost) => openpost);
export const unsetOpenpost = createAction(UNSET_OPENPOST);

const initialState = {
  openpost: null,
  error: null,
};
const openpost = handleActions(
  {
    [OPENPOST]: (state, { payload: openpost }) => ({
      ...state,
      openpost: openpost,
    }),
    [UNSET_OPENPOST]: () => initialState,
  },
  initialState,
);

export default openpost;
