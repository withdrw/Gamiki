import { useDispatch } from "react-redux";
import { getPostsThunk, deletePostThunk } from "../../redux/post";
import { useModal } from "../../context/Modal";
import './DeletePost.css'

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
    <div className="deletePost-modal">
      <div className="delete-content">
        <h1>Are you sure you want to delete this post? </h1>
        <div className="delete-Btns">
          <button className="delete-yes" onClick={handleUpdate}>Yes</button>
          <span className="btn-space"></span>
        <button className="delete-no"  onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
