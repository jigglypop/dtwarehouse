import { createAction, handleActions } from 'redux-actions';

const UNSET_OPENER = 'opener/UNLOAD_OPENER';
const [OPENER] = 'opener/OPENER';
export const setOpener = createAction(OPENER, (opener) => opener);
export const unsetOpener = createAction(UNSET_OPENER);

const initialState = {
  opener: null,
  error: null,
};
const opener = handleActions(
  {
    [OPENER]: (state, { payload: opener }) => ({
      ...state,
      opener: opener,
    }),
    [UNSET_OPENER]: () => initialState,
  },
  initialState,
);

export default opener;
