import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk } from "../../redux/comment";
import { useModal } from "../../context/Modal";

const EditCommentModal = ({ comment, onClose }) => {
  const [body, setBody] = useState(comment.body);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleUpdate = async () => {
    const updatedComment = { body: body };
    console.log("updated comment: ", updatedComment);
    console.log("comment id: ", comment.id);

    const response = await dispatch(
      editCommentThunk(comment.id, updatedComment)
    );
    console.log("response:", response);
    if (response && response.Comment) {
      //   dispatch(getAllCommentsThunk());
      closeModal();
    }
    closeModal();

      
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}></span>
        <h2>Edit Comment</h2>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default EditCommentModal;
