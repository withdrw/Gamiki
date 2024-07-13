const GET_POSTS = '/posts/getAll'
const GET_ONE_POST = '/posts/getOne'





const getOnePost = (post) => ({
    type: GET_ONE_POST,
    payload: post
})

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

// GET A SINGLE POST THINK

export const getOnePostThunk = (id) => async (dispatch) =>{
    const res = await fetch(`/api/posts/${id}`)
    if (res.ok){
        const { Post } = await res.json()
        dispatch(getOnePost(Post))
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
        case GET_ONE_POST: {
            const newState = {}
            const question = action.payload
            newState[action.payload.id] = question
            return newState
            }
        default:
            return state
    }
}

export default postReducer
