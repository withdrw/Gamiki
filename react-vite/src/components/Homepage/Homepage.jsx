import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../redux/post";

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
            <div key={post.id} className="homepage-single">
              <h1 className="post-title">{post.title}</h1>
              <p className="post-owner">{post.author}</p>
              {post.comments.map((comment) => (
                  <p key={comment.id}>{comment.body}</p>
              ))}
              <p className="post-body">{post.body}</p>
              <p className="post-body">{post.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Homepage
