import axios from "axios";

const setPosts = (data) => ({
  type: "SET_POSTS",
  payload: data,
});

const setPostDetail = (data) => ({
  type: "SET_POST",
  payload: data,
});

export const getPosts = (params) => (dispatch) => {
  axios({
    params,
    method: "get",
    url: "https://www.techinasia.com/wp-json/techinasia/2.0/posts",
    responseType: "json",
  }).then(function (response) {
    dispatch(setPosts(response.data.posts));
  });
};

export const getPost = (slug) => (dispatch) => {
  axios({
    method: "get",
    url: `https://www.techinasia.com/wp-json/techinasia/2.0/posts/${slug}`,
    responseType: "json",
  }).then(function (response) {
    dispatch(setPostDetail(response.data.posts[0]));
  });
};
