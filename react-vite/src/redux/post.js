const GET_POSTS = "/posts/getAll";
const GET_ONE_POST = "/posts/getOne";
const EDIT_POSTS = "/posts/editPost";
const DELETE_POST = "/posts/deletePost";
const CREATE_POST = "/posts/createPost";
const ADD_IMAGE = "/posts/addImage";

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

const addPostImage = (postId, image) => ({
  type: ADD_IMAGE,
  postId,
  image,
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
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
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
  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data.Post));
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

//ADD IMAGE
export const thunkPostImage = (post, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await fetch(`/api/images/${post.Post.id}`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const postImage = await res.json();
    dispatch(addPostImage(post.id, postImage));
    return postImage;
  } else {
    const error = await res.json();
    return error;
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
    case ADD_IMAGE: {
      const newState = { ...state };
      return newState;
    }

    default:
      return state;
  }
};

export default postReducer;
