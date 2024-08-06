import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk, getPostsThunk, thunkPostImage } from "../../redux/post";
import { useModal } from "../../context/Modal";
import "./EditModal.css";

const ManagePostModal = ({ post, onClose , reload ,  reloadBool }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [image, setImage] = useState(null);
  const [imageUrl] = useState(post.images?.[0]?.imageUrl || "");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState('')
    const [titleRemaining, setTitleRemaining] = useState(30);
    const [bodyTyped, setBodyTyped] = useState(body.length);

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
      setErrors([
        "File does not have an approved extension: pdf, jpg, jpeg, png, gif",
      ]);
    } else {
      setImage(file);
      setErrors([]);
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

  const handleUpdate = async () => {
    const errors = {};
    if (title.length < 5 || title.length > 30) {
      errors.title = "Title must be 5 to 30 characters long";
    }
    if (body.length < 150 || body.length >= 2048) {
      errors.body = "Description must be between 150 and 2048 characters long";
    }
    if (!image && !imageUrl) {
      errors.image = "You must upload an image to create a post";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const updatedPost = { title: title, body: body };
    const response = await dispatch(editPostThunk(updatedPost, post.id));
    if (response && response.Post) {
      if (image) {
        setImageLoading(true);
        const imgResponse = await dispatch(thunkPostImage(response, image));
        if (imgResponse.errors) {
          setErrors(imgResponse.errors);
        }
      }
      setImageLoading(false);
      closeModal();
      dispatch(getPostsThunk());
      reload(!reloadBool)
    } else {
      closeModal();
    }

  };

  return (
    <div className="editPost-modal">
      <div className="editPost-content">
        <span className="close" onClick={onClose}></span>
        <div className="editPost-header">
          <h2>Edit Post</h2>
        </div>
        <label>
          {" "}
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
        </label>
        <p className="char-counter">{titleRemaining} characters remaining</p>
        {errors.title && <p className="error">{errors.title}</p>}
        <label>
          {" "}
          Description:
          <textarea
            rows={4}
            value={body}
            onChange={handleBodyChange}
            placeholder="Body"
          />
        </label>
        <p className="char-counter">{bodyTyped} characters count</p>
        {errors.body && <p className="error">{errors.body}</p>}
        <div className="photo">
          {imageUrl && (
            <div className="photo-preview">
              <p>Current Image:</p>
              <img
                className="photo-image"
                src={imageUrl}
                alt="Current Post Image"
              />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            id="image-upload"
            className="upload-button"
          />
          {imageLoading && <p>Loading...</p>}
        </div>
        <div className="edit-Modal-btn">
          <button className="edit-modal-update" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePostModal;
