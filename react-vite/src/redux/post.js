const GET_POSTS = '/posts/getAll'








// GET ALL POSTS TYPE
const getPost = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

// GET ALL POSTS THUNK

export const getPostsThunk = () => async (dispatch) => {
    const res = await fetch('/api/posts/')
    if (res.ok) {
        const {Posts} = await res.json()
        dispatch(getPost(Posts));
    } else {
        const data = await res.json()
        return data.errors
    }
}




//REDUCERS

const initialState = {}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS: {
            const newState = {}
            action.payload.forEach((post) => newState[post.id] = post)
            return newState
        }
        default:
            return state
    }
}

export default postReducer
