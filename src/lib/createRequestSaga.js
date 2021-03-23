import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) {
    const response = yield call(request, action.payload);
    yield put(startLoading(type));
    if (response.message) {
      yield put({
        type: FAILURE,
        payload: response.message,
        error: response.message,
      });
    } else {
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    }

    yield put(finishLoading(type));
  };
}
