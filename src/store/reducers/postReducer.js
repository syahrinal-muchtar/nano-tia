const initialState = {
  posts: [],
  postDetail: {},
  page: 1,
};
const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: state.posts.concat(payload),
        page: state.page + 1,
      };
      case "SET_POST":
        return {
          ...state,
          postDetail: payload
        };
    default:
      return {
        ...state,
      };
  }
};
export default postReducer;
