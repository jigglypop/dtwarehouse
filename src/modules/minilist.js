import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  MINILIST_POSTS,
  MINILIST_POSTS_SUCCESS,
  MINILIST_POSTS_FAILURE,
] = createRequestActionTypes('post/MINILIST_POSTS');
const CLEAR_NEXT = createRequestActionTypes('post/CLEAR_NEXT');

export const minilistPosts = createAction(MINILIST_POSTS, page => page);
export const clearNext = createAction(CLEAR_NEXT);
export function* minilistSaga() {
  yield takeLatest(
    MINILIST_POSTS,
    createRequestSaga(MINILIST_POSTS, postsAPI.minilistPosts),
  );
}

const initialState = {
  minilist: [],
  next: '',
  error: null,
};

const minilist = handleActions(
  {
    [MINILIST_POSTS_SUCCESS]: (state, { payload: minilist }) => ({
      ...state,
      minilist: state.minilist.concat(minilist.results),
      next: minilist.next,
    }),
    [MINILIST_POSTS_FAILURE]: (state, { payload: error }) => ({
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

export default minilist;
