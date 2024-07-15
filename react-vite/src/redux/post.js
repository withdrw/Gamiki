const GET_POSTS = "/posts/getAll";
const GET_ONE_POST = "/posts/getOne";
const EDIT_POSTS = "/posts/editPost";
const DELETE_POST = "/posts/deletePost";
const CREATE_POST = "/posts/createPost";

// GET ONE POST
const getOnePost = (post) => ({
  type: GET_ONE_POST,
  payload: post,
});

// GET ALL POSTS TYPE
const getPost = (posts) => ({
  type: GET_POSTS,
  payload: posts,
});

// EDIT POSTS TYPE
const editPost = (post) => ({
  type: EDIT_POSTS,
  payload: post,
});

// DELETE POST TYPE
const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

// CREATE POST TYPE
const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

// GET ALL POSTS THUNK
export const getPostsThunk = () => async (dispatch) => {
  const res = await fetch("/api/posts/");
  if (res.ok) {
    const { Posts } = await res.json();
    dispatch(getPost(Posts));
  } else {
    const data = await res.json();
    return data.errors;
  }
};

// GET A SINGLE POST THINK
export const getOnePostThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);
  if (res.ok) {
    const { Post } = await res.json();
    dispatch(getOnePost(Post));
  } else {
    const data = await res.json();
    return data.errors;
  }
};

//EDIT POSTS THUNK
export const editPostThunk = (post, postId) => async (dispatch) => {
  const id = postId;
  console.log("in thunk: ", id);
  console.log("in thunk: ", post);
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  console.log("in thunk response: ", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(editPost(data.Post));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};

// DELETE POST THUNK
export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  console.log("in thunk delete: ", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(deletePost(data.postId));
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

// CREATE POST THUNK
export const createPostThunk = (post) => async (dispatch) => {
  const response = await fetch("/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  console.log("in thunk create ", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data.Post));
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

//REDUCERS
const initialState = {};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      const newState = {};
      action.payload.forEach((post) => (newState[post.id] = post));
      return newState;
    }
    case GET_ONE_POST: {
      const newState = {};
      const question = action.payload;
      newState[action.payload.id] = question;
      return newState;
    }
    case EDIT_POSTS: {
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
      };
    }
    case DELETE_POST: {
      const newState = { ...state };
      delete newState[action.payload];
      return { ...newState };
    }
    case CREATE_POST: {
      let newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default postReducer;
