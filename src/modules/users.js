import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga from '../lib/createRequestSaga';

const TEMP_SET_USER = 'users/TEMP_SET_USER';

const CHECK = 'users/CHECK';
const CHECK_SUCCESS = 'users/CHECK_SUCCESS';
const CHECK_FAILURE = 'users/CHECK_FAILURE';

const LOGOUT = 'users/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const checks = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checksSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.clear();
  } catch (e) {
    console.log(e);
  }
}

export function* usersSaga() {
  yield takeLatest(CHECK, checksSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      user: data,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
