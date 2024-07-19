import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPostThunk,
  getPostsThunk,
  thunkPostImage,
} from "../../redux/post";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [image, setImage] = useState(null);
  const [imageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (
      file &&
      !["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(
        file.type
      )
    ) {
      setErrors(["File does not have extension: pdf, jpg, jpeg, png, gif"]);
    } else {
      setImage(file);
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const errors = {};
    if (title.length < 5) {
      errors.title = "Title must be at least 5 characters long";
    }
    if (body.length < 50) {
      errors.body = "Body must be at least 50 characters long";
    }
    if (!image) {
      errors.image = "Upload an image";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (!user) {
      setErrors({ general: "You must be logged in to make a post" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    const newPost = {
      title: title,
      body: body,
    };
    console.log("this is a new post: ", newPost);
    let response = await dispatch(createPostThunk(newPost));
    console.log("this is the response: ", response);

    if (response.errors) {
      setErrors(response.errors);
    }

    if (image) {
      setImageLoading(true);
      console.log("RESPONSE 1: ", response);
      console.log("RESPONSE 2: ", image);
      const imageResponse = await dispatch(thunkPostImage(response, image));
      console.log("imageResponse: ", imageResponse);
      if (imageResponse.errors) {
        setErrors(imageResponse.errors);
      }
      navigate(`/posts/${response.Post.id}`);
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
          <div className="form-group">
            <div className="photo">
              <input
                type="file"
                onChange={handleFileChange}
                id="image-upload"
                className="upload-button"
              />
              {imageUrl && (
                <p>
                  Image URL:{" "}
                  <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    {imageUrl}
                  </a>
                </p>
              )}
              {imageLoading && <p>Loading...</p>}
            </div>
          </div>
          {submitted && errors.body && <p className="error">{errors.body}</p>}
          {submitted && errors.general && (
            <p className="error">{errors.general}</p>
          )}
          <button type="submit"> Create Post </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
