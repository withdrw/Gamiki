import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../redux/post";
import { NavLink } from "react-router-dom";
import './Homepage.css'

const Homepage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="homepage-body">
        <div className="homepage-posts">
          {Object.values(posts).map((post) => (
            <NavLink
              key={post.id}
              to={`/posts/${post.id}`}
              className="homepage-single"
            >
              <div className="post-content">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-owner">Author: {post.author}</p>
                <p className="post-body">{post.body}</p>
                {post.comments.map((comment) => (
                  <p className="post-comment" key={comment.id}> Comments: {comment.body}</p>
                ))}
                <p className="post-likes">Likes: {post.likes}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
