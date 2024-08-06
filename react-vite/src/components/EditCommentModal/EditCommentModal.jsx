import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk } from "../../redux/comment";
import { useModal } from "../../context/Modal";
import './EditCommentModal.css'

const EditCommentModal = ({ comment, onClose }) => {
  const [body, setBody] = useState(comment.body);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [bodyTyped, setBodyTyped] = useState(body.length);
  const [errors, setErrors] = useState('')

  const handleUpdate = async () => {

    const errors = {};
    if (body.length < 15 || body.length >= 450) {
      errors.body = "Comment must be between 15 and 450 characters long";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


    const updatedComment = { body: body };

    const response = await dispatch(
      editCommentThunk(comment.id, updatedComment)
    );
    if (response && response.Comment) {
      //   dispatch(getAllCommentsThunk());
      closeModal();
    }
    closeModal();

  };

    const handleBodyChange = (e) => {
      const value = e.target.value;
      setBody(value);
      setBodyTyped(value.length);
    };

  return (
    <div className="editComment-modal">
      <div className="editComment-content">
        <span className="close" onClick={onClose}></span>
        <h2>Edit Comment</h2>
        <label className="editComment-lbl">
          Comment:
          <textarea
            value={body}
            // onChange={(e) => setBody(e.target.value)}
            onChange={handleBodyChange}
            placeholder="Body"
          />
        </label>
        <p className="char-counter">{bodyTyped} characters count</p>
        {errors.body && <p>{errors.body}</p>}
        <div className="editComment-btn">
          <button className="editComment-update" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
