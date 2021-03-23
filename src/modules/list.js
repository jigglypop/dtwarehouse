import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('post/LIST_POSTS');
const CLEAR_NEXT = createRequestActionTypes('post/CLEAR_NEXT');

export const listPosts = createAction(LIST_POSTS, page => page);
export const clearNext = createAction(CLEAR_NEXT);
export function* listSaga() {
  yield takeLatest(
    LIST_POSTS,
    createRequestSaga(LIST_POSTS, postsAPI.listPosts),
  );
}

const initialState = {
  list: [],
  next: '',
  error: null,
};

const list = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      list: state.list.concat(list.results),
      next: list.next,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLEAR_NEXT]: state => ({
      ...state,
      next: '',
    }),
  },
  initialState,
);

export default list;
