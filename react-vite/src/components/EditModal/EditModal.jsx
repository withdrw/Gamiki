import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk, getPostsThunk, thunkPostImage } from "../../redux/post";
import { useModal } from "../../context/Modal";
import "./EditModal.css";

const ManagePostModal = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [image, setImage] = useState(null);
  const [imageUrl] = useState(post.images?.[0]?.imageUrl || "");
  const [imageLoading, setImageLoading] = useState(false);
  const [setErrors] = useState('')

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

  const handleUpdate = async () => {
    const updatedPost = { title: title, body: body };
    console.log("updated post: ", updatedPost);
    // console.log("post id: ")
    const response = await dispatch(editPostThunk(updatedPost, post.id));
    console.log("response:", response);
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
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}></span>
        <h2>Edit Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />

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
      </div>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ManagePostModal;
