import axios from 'axios';
import { server_url } from './server_url';

// 글쓰기
export const writePost = async ({
  title,
  content,
  profileid,
  category,
  image_file,
}) => {
  return axios
    .post(server_url + '/api/posts/', {
      title,
      content,
      profileid,
      category,
      image_file,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      localStorage.setItem('write_err', e);
      return e;
    });
};

export const readPost = (id) => {
  return axios
    .get(server_url + `/api/posts/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const listPosts = (page) => {
  return axios
    .get(server_url + page)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
// 미니리스트
export const minilistPosts = () => {
  return axios
    .get(server_url + '/api/minilist/')
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
// 미니 포스트(카드용)
export const minipostPosts = (page) => {
  return axios
    .get(server_url + page)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const updatePost = ({ id, title, content }) => {
  return axios
    .patch(server_url + `/api/posts/${id}/`, {
      title,
      content,
    })
    .then((res) => {
      return res;
    });
};

export const removePost = (id) => {
  return axios.delete(server_url + `/api/posts/${id}/`).then((res) => {
    return res;
  });
};

export const removeComment = (id) => {
  return axios
    .delete(server_url + `/api/comments/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const createComment = ({ commenter, name, text, postid }) => {
  return axios
    .post(server_url + '/api/comments/', { commenter, name, text, postid })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

// 리코멘터링
export const removeRecomment = (id) => {
  return axios
    .delete(server_url + `/api/recomments/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const createRecomment = ({ commenter, name, text, commentid }) => {
  return axios
    .post(server_url + '/api/recomments/', { commenter, name, text, commentid })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

// 어워드
export const awardPosts = () => {
  return axios
    .get(server_url + '/api/numlike/?page=1')
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
