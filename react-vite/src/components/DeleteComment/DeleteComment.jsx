import { useDispatch } from "react-redux";
import { myComments, deleteCommentThunk } from "../../redux/comment";
import { useModal } from "../../context/Modal";
import './DeleteComment.css'

const DeleteComment = ({ comment }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleUpdate = async () => {
    console.log("this is post: ", comment);
    const response = await dispatch(deleteCommentThunk(comment.id));
    console.log("response:", response);
    if (response) {
      closeModal();
      dispatch(myComments());
    }
    closeModal();
  };

  return (
    <div className="deleteComment-modal">
      <div className="deleteComment-content">
        <h1>Are you sure you want to delete this comment? </h1>
        <div className="deleteComment-btns">
          <button className="deleteComment-yes" onClick={handleUpdate}>
            Yes
          </button>
          <span className="btn-space"></span>
          <button className="deleteComment-no" onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
