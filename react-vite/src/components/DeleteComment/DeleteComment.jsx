import { useDispatch } from "react-redux";
import { myComments, deleteCommentThunk } from "../../redux/comment";
import { useModal } from "../../context/Modal";

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
    <div className="modal">
      <div className="modal-content">
        <h1>Are you sure you want to delete this comment? </h1>
        <button onClick={handleUpdate}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default DeleteComment;
