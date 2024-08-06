import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPostThunk,
  getPostsThunk,
  thunkPostImage,
} from "../../redux/post";
import './CreatePost.css'

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
  const [titleRemaining, setTitleRemaining] = useState(30)
  const [bodyTyped , setBodyTyped] = useState(0)

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
  if (title.length < 5 || title.length > 30) {
    errors.title = "Title must be 5 to 30 characters long";
  }
  if (body.length < 150 || body.length >= 2048) {
    errors.body = "Description must be between 150 and 2048 characters long";
  }
  if (!image) {
    errors.image = "You must upload an image to create a post";
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
    let response = await dispatch(createPostThunk(newPost));

    if (response.errors) {
      setErrors(response.errors);
    }

    if (image) {
      setImageLoading(true);
      const imageResponse = await dispatch(thunkPostImage(response, image));
      if (imageResponse.errors) {
        setErrors(imageResponse.errors);
      }
      navigate(`/posts/${response.Post.id}`);
    } else {
      const postId = response.Post.id;
      navigate(`/posts/${postId}`);
      getPostsThunk();
      // dispatch(getPostsThunk());
    }
  };


  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
      setTitleRemaining(30 - value.length);
    }
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);
    setBodyTyped(value.length);
  };


  return (
    <div className="createpost-body">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="createpost-form"
      >
        <div className="createpost-content">
          <h1> Create a new post </h1>
          <label htmlFor="title"> Title: </label>
          <input type="text" value={title} onChange={handleTitleChange} />
          <p className="char-counter">{titleRemaining} characters remaining</p>
          {submitted && errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="body"> Body: </label>
          <textarea
            maxLength={2048}
            className="create-post-body"
            value={body}
            onChange={handleBodyChange}
            rows={10}
            cols={10}
          />
          <p className="char-counter">{bodyTyped} characters count</p>
          {submitted && errors.body && <p className="error">{errors.body}</p>}
          <div className="form-group">
            <div className="photo">
              <input
                type="file"
                onChange={handleFileChange}
                id="image-upload"
                className="upload-button"
              />
              {submitted && errors.image && (
                <p className="error">{errors.image}</p>
              )}
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
          {submitted && errors.general && (
            <p className="error">{errors.general}</p>
          )}
          <button className="create-btn" type="submit">
            {" "}
            Create Post{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
