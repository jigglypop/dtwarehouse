import { createAction, handleActions } from 'redux-actions';

const UNSET_POSITION = 'position/UNLOAD_POSITION';
const [POSITION] = 'position/POSITION';
export const setPosition = createAction(POSITION, (position) => position);
export const unsetPosition = createAction(UNSET_POSITION);

const initialState = {
  position: null,
  error: null,
};
const position = handleActions(
  {
    [POSITION]: (state, { payload: position }) => ({
      ...state,
      position: position,
    }),
    [UNSET_POSITION]: () => initialState,
  },
  initialState,
);

export default position;
