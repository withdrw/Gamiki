import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk, getPostsThunk } from "../../redux/post";
import { useModal } from "../../context/Modal";

const ManagePostModal = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleUpdate = async () => {
    const updatedPost = { title: title, body: body };
    console.log("updated post: ", updatedPost);
    console.log("post id: ")
    const response = await dispatch(editPostThunk(updatedPost, post.id));
    console.log("response:", response);
    if (response && response.Post) {
      closeModal(); // Close modal if update successful
      dispatch(getPostsThunk());
    }
    closeModal();
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
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ManagePostModal;
