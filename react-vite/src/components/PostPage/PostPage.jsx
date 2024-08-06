import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePostThunk } from "../../redux/post";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateComment from "../CreateComment/CreateComment";
import { createLikeThunk, removeLikeThunk } from "../../redux/like";
import './PostPage.css'

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[postId]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const userId = useSelector((state) => state.session.user);
  let userLikes = useSelector((state) => state.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
    // dispatch(userLikesThunk());
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setLikes(post.likes.length);
      setComments(post.comments || []);
      if (userId) {
        setIsLiked(post.likes.some((like) => like.user === userId.id));
      }
    }
  }, [post, userId]);

  useEffect(() => {
    if (userLikes && userLikes.length > 0) {
      setIsLiked(userLikes.some((like) => like.postId === postId));
    } else {
      setIsLiked(false);
    }
  }, [userLikes, postId]);

  const handleLike = async () => {
    await dispatch(createLikeThunk(postId));
    setIsLiked(true);
    dispatch(getOnePostThunk(postId));
  };

  const handleUnlike = async () => {
    try {

      const likeIdToRemove = post.likes.find((like) => like.user === userId.id);

      if (likeIdToRemove) {
        const dispo = await dispatch(removeLikeThunk(likeIdToRemove.id));
        setIsLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      }
    } catch (error) {
      console.error("Error removing like:", error);
      setIsLiked(true);
      setLikes(likes);
      dispatch(getOnePostThunk(postId));
    }
  };

  return (
    <div className="postpage-container">
      <div className="post-contents">
        <h1 className="page-title">{title}</h1>
        <div className="route-images">
          {post &&
            post.images &&
            post.images.map((image) => (
              <img className="page-image" key={image.id} src={image.imageUrl} />
            ))}
        </div>
        <p className="page-body">{body}</p>
        <p className="page-likes">Likes: {likes}</p>
        <div id="like-buttons">
          {userId ? (
            isLiked ? (
              <button className="likeBtn" onClick={handleUnlike}>
                Unlike
              </button>
            ) : (
              <button className="likeBtn" onClick={handleLike}>
                Like
              </button>
            )
          ) : (
            <button className="disabledBtn" disabled>
              Like
            </button>
          )}
        </div>

        <h2>Comments: </h2>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-page">
              <p className="page-owner">{comment.author}:</p>
              <p className="page-comment">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="manage-btn">
        {userId ? (
          <OpenModalButton
            buttonText="Comment"
            className="manage-delete"
            modalComponent={<CreateComment />}
          />
        ) : (
          <button disabled>Comment </button>
        )}
      </div>
    </div>
  );
};

export default PostPage;
