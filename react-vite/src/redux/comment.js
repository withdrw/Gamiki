const CREATE_COMMENT = "/comments/createComment";
const GET_COMMENT = "/comments/getComments";
const EDIT_COMMENT = "/comments/editComment";
const DELETE_COMMENT = "/comments/deleteComment";

// CREATE COMMENT TYPE
const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

// GET COMMENT TYPE
const getComments = (comments) => ({
  type: GET_COMMENT,
  payload: comments,
});

// EDIT COMMENT TYPE
const editComment = (comment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});

// DELETE COMMENT TYPE
const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});

// GET COMMENTS THUNK
export const getAllCommentsThunk = (id) => async (disptch) => {
  const response = await fetch(`/api/posts/${id}/comments`);
  if (response.ok) {
    const { Comments } = await response.json();
    await disptch(getComments(Comments));
    return Comments;
  }
};

// GET CURRENT USERS COMMENTS
export const myComments = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/comments`);
    if (response.ok) {
      const { Comments } = await response.json();
      dispatch(getComments(Comments));
      console.log("in thunk comment: ", Comments);
      return Comments;
    } else {
      throw new Error("Failed to fetch comments");
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { error: "Failed to fetch comments" }; // Handle error gracefully
  }
};

// // EDIT COMMENT THUNK
export const editCommentThunk = (commentId, comment) => async (dispatch) => {
  console.log("COMMENT : ", comment);
  console.log("COMMENT ID: ", commentId);
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  console.log("in thunk response edit comment: ", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data.Comment));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};

// CREATE COMMENT THUNK
export const createCommentThunk = (id, comment) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  console.log("in thunk create ", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(createComment(data.Comment));
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

// DELETE COMMENT THUNK
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(data.commentId));
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

//REDUCER
const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT: {
      const newState = { ...state.comments };
      action.payload.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    }
    case CREATE_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = {};
      for (let value of Object.values(state)) {
        if (value.id !== action.payload) {
          newState[value.id] = value;
        }
      }
      return newState;
    }
    default:
      return state;
  }
};
export default commentReducer;
