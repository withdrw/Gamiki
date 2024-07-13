import { useDispatch } from "react-redux";
import { getPostsThunk, deletePostThunk } from "../../redux/post";
import { useModal } from "../../context/Modal";

const DeletePost = ({ post }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleUpdate = async () => {
    console.log("this is post: ", post);
    const response = await dispatch(deletePostThunk(post.id));
    console.log("response:", response);
    if (response) {
      closeModal(); // Close modal if update successful
      dispatch(getPostsThunk());
    }
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Are you sure you want to delete this post? </h1>
        <button onClick={handleUpdate}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default DeletePost;
