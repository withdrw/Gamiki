import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../redux/post";
import ManagePostModal from "../EditModal/EditModal";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "../DeletePost/DeletePost";

function postsByUserId(posts, userId) {
  return Object.values(posts).filter((post) => post.ownerId === userId);
}

const ManagePost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.session.user.id);
  //   const [editPostId, setEditPostId] = useState(null);
  //   const [title, setTitle] = useState("");
  //   const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  const userPosts = postsByUserId(posts, userId);

  return (
    <>
      <div className="manage-posts-container">
        <div id="manage-posts-overview">
          <h2>Manage Posts</h2>
        </div>
        {userPosts.length ? (
          <div className="manage-display-posts-container">
            {userPosts.map((post) => (
              <div className="manage-post-tile" key={post.id}>
                <div className="manage-post-info">
                  <h1>{post.title}</h1>

                  {post.images && post.images.length > 0 && (
                    <div className="post-images">
                      {post.images.map((image) => (
                        <img
                          key={image.id}
                          src={image.imageUrl}
                          alt={`Post ${post.id} Image`}
                          className="post-image"
                        />
                      ))}
                    </div>
                  )}

                  <p>{post.author}</p>
                  <p>{post.body}</p>
                  <div className="manage-tag-display">
                    {post.comments.map((comment) => (
                      <p key={comment.id}>{comment.body}</p>
                    ))}
                  </div>
                  <p>Date: {new Date(post.timeCreated).toLocaleDateString()}</p>
                </div>
                <div className="manage-btn">
                  <OpenModalButton
                    buttonText="Update"
                    className="manage-update"
                    modalComponent={<ManagePostModal post={post} />}
                  />
                </div>
                <div className="manage-btn">
                  <OpenModalButton
                    buttonText="Delete"
                    className="manage-delete"
                    modalComponent={<DeletePost post={post} />}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="manage-posts-container-none">
            <div id="manage-posts-overview">
              <h2> No Posts</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagePost;
