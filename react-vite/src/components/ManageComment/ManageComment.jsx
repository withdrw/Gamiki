import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myComments } from "../../redux/comment";
import OpenModalButton from "../OpenModalButton";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import DeleteComment from "../DeleteComment/DeleteComment";
import './ManageComment.css'

const ManageComment = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(myComments());
  }, [dispatch]);

  return (
    <div className="manage-comments-container">
      <h2>All Your Comments</h2>
      {comments && Object.values(comments).length > 0 ? (
        <div className="comments-list">
          {Object.values(comments).map((comment) => (
            <div className="comment" key={comment.id}>
              <p className="comment-mainPost">
                Post Name: {comment.mainPost.title}
              </p>
              <p className="comment-body">Comment: {comment.body}</p>
              <div className="manage-btn">
                <OpenModalButton
                  buttonText="Update"
                  className="manage-update"
                  modalComponent={<EditCommentModal comment={comment} />}
                />
                <span className="btn-space"></span>
                <OpenModalButton
                  buttonText="Delete"
                  className="manage-delete"
                  modalComponent={<DeleteComment comment={comment} />}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};

export default ManageComment;
