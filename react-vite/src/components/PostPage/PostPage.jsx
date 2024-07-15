import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePostThunk } from "../../redux/post";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateComment from "../CreateComment/CreateComment";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[postId]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setLikes(post.likes);
      setComments(post.comments || []);
    }
  }, [post]);

  return (
    <div className="postpage-container">
      <div className="post-contents">
        <h1>{title}</h1>
        <p>{body}</p>
        <p>Likes: {likes}</p>
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="manage-btn">
        <OpenModalButton
          buttonText="Comment"
          className="manage-delete"
          modalComponent={<CreateComment />}
        />
      </div>
    </div>
  );
};

export default PostPage;
