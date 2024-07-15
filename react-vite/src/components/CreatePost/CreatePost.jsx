import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostThunk, getPostsThunk } from "../../redux/post";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) =>  state.session.user)

  // useEffect(() =>{
  //     const errors = {};
  //     if(title.length < 10) {
  //         errors.title = "Title must be at least 10 characters long";
  //     }
  //     if(body.length < 150){
  //         errors.body = "Body must be at least 150 characters long";
  //     }
  //     setErrors(errors);
  //     console.log(errors);
  // }, [title, body])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const errors = {};
    if (title.length < 10) {
      errors.title = "Title must be at least 10 characters long";
    }
    if (body.length < 150) {
      errors.body = "Body must be at least 150 characters long";
    }


    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (!user) {
      setErrors({ general: "You must be logged in to make a post" });
      setTimeout(() => {navigate('/login')},3000)
    }
    const newPost = {
      title: title,
      body: body,
    };
    console.log("this is a new post: ", newPost);
    const response = await dispatch(createPostThunk(newPost));
    console.log("this is the response: ", response);

    if (response.errors) {
      setErrors(response.errors);
    } else {
      const postId = response.Post.id;
      console.log("new post id: ", postId);
      navigate(`/posts/${postId}`);
      getPostsThunk();
      // dispatch(getPostsThunk());
    }
  };


  return (
    <div className="createpost-body">
      <form onSubmit={handleSubmit} className="createpost-form">
        <div className="createpost-content">
          <h1> Create a new post </h1>
          <label htmlFor="title"> Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {submitted && errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="body"> Body: </label>
          <textarea
            className="create-post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {submitted && errors.body && <p className="error">{errors.body}</p>}
           {submitted && errors.general && <p className="error">{errors.general}</p>}
          <button type="submit"> Create Post </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
