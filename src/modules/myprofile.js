import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_MYPROFILE,
  READ_MYPROFILE_SUCCESS,
  READ_MYPROFILE_FAILURE,
] = createRequestActionTypes('myprofile/READ_MYPROFILE');
const UNLOAD_MYPROFILE = 'myprofile/UNLOAD_MYPROFILE';
const SET_MYPROFILE = 'myprofile/SET_MYPROFILE';

export const readMyprofile = createAction(READ_MYPROFILE, (id) => id);
export const setMyprofile = createAction(
  SET_MYPROFILE,
  (myprofile) => myprofile,
);

export const unloadMyprofile = createAction(UNLOAD_MYPROFILE);

const readMyprofileSaga = createRequestSaga(
  READ_MYPROFILE,
  authAPI.readMyprofile,
);
export function* myprofileSaga() {
  yield takeLatest(READ_MYPROFILE, readMyprofileSaga);
}

const initialState = {
  myprofile: null,
  error: null,
};

const post = handleActions(
  {
    [READ_MYPROFILE_SUCCESS]: (state, { payload: myprofile }) => ({
      ...state,
      myprofile,
    }),
    [READ_MYPROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SET_MYPROFILE]: (state, { payload: myprofile }) => ({
      ...state,
      myprofile,
    }),
    [UNLOAD_MYPROFILE]: () => initialState,
  },
  initialState,
);

export default post;
