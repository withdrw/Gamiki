import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCommentThunk } from "../../redux/comment";
import { getPostsThunk } from "../../redux/post";
import { useParams } from "react-router-dom";
import './CreateComment.css'

const CreateComment = () => {
    const { postId } = useParams();
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [bodyTyped, setBodyTyped] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (body.length < 15 || body.length >= 450) {
            validationErrors.body = "Description must be between 15 and 450 characters long";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newComment = {
            body: body,
        };

        const response = await dispatch(createCommentThunk(postId, newComment));
        console.log(response);
        if (!response.errors) {
            await dispatch(getPostsThunk());
            closeModal();
        } else {
            console.error("Failed to create comment:", response.errors);
            setErrors({ general: "Failed to create comment. Please try again." });
        }
    };

    const handleBodyChange = (e) => {
        const value = e.target.value;
        setBody(value);
        setBodyTyped(value.length);
    };

    return (
      <div className="create-comment-modal">
        <div className="createModal-content">
          <span className="close" onClick={closeModal}></span>
          <h2> Write your comment here: </h2>
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Body"
          />
          <p className="char-counter">{bodyTyped} characters count</p>
          {errors.body && <p className="error-message">{errors.body}</p>}
          {errors.general && <p className="error-message">{errors.general}</p>}
          <div className="createComment-btn">
            <button className="createComment-sub" onClick={handleSubmit}>
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    );
};

export default CreateComment;
