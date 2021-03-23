import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import list, { listSaga } from './list';
import minilist, { minilistSaga } from './minilist';
import post, { postSaga } from './post';

import auths, { authsSaga } from './auths';
import users, { usersSaga } from './users';
import myprofile, { myprofileSaga } from './myprofile';

import minipost, { minipostSaga } from './minipost';
import opener from './opener';
import openpost from './openpost';
import position from './position';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  list,
  post,

  auths,
  users,

  myprofile,
  minilist,
  minipost,
  opener,
  openpost,
  position,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    listSaga(),
    postSaga(),

    authsSaga(),
    usersSaga(),

    myprofileSaga(),
    minilistSaga(),
    minipostSaga(),
  ]);
}

export default rootReducer;
