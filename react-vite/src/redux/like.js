const CREATE_LIKE = '/posts/createLike'
const GET_POST_LIKES = '/posts/getLikes'
const DELETE_LIKE = '/posts/deleteLike'
// const GET_USER_LIKES = '/likes/getUserLikes'


// CREATE LIKE TYPE
const createLike = (post) => ({
    type: CREATE_LIKE,
    payload: post
})

// GET LIKE TYPE
const getLikes = (posts) => ({
    type: GET_POST_LIKES,
    payload: posts
})

// DELETE LIKE TYPE
const deleteLike = (id) => ({
    type: DELETE_LIKE,
    payload: id
})

// const userLikes = (posts) => ({
//     type: GET_USER_LIKES,
//     payload: posts
// })

// GET USER LIKES
// export const userLikesThunk = () => async (dispatch) => {
//     const response = await fetch(`/api/users/likes`);
//     if(response.ok){
//         const {Likes } = await response.json();
//         dispatch(userLikes(Likes));
//     } else {
//         const data = await response.json();
//         return data.errors;
//     }
// }

// GET LIKES
export const getLikesPost = () => async(dispatch) => {
    const response = await fetch(`/api/users/likes`);
    if(response.ok){
        const data = await response.json();
        dispatch(getLikes(data.likes));
        return data.likes;
    }
}

// CREATE NEW LIKE THUNK
export const createLikeThunk = (postId) => async(dispatch) => {
    const response = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST"
    })
    if(response.ok) {
        const data = await response.json();
        dispatch(createLike(data.Like));
        return data;
    }
}

// //DELETE LIKE THUNK
export const removeLikeThunk = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/like/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const { Id } = await response.json();
            dispatch(deleteLike(Id));
            return Id;
        } else {
            const data = await response.json();
            console.error('Error:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};



const initialState = {}

const likesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CREATE_LIKE: {
            // const newState = { ...state, ...state.likes }
            // newState[action.payload.post.id] = action.payload
            // return newState
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
            }
        case DELETE_LIKE: {
            // const newState = { ...state, ...state.posts };
            // delete newState[action.payload];
            // return { ...newState };
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case GET_POST_LIKES: {
            const newState = {};
            action.payload.forEach(
                (post) => (newState[post.id] = post)
            );
            return newState;
        }
        // case GET_USER_LIKES : {
        //     const newState = {...state.likes, ...state};
        //     action.payload.forEach(
        //       (post) => (newState[post.post.id] = post)
        //     );
        //     return newState;
        // }
      default:
        return state;
    }
}
export default likesReducer;
