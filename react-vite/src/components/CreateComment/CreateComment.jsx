import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCommentThunk } from "../../redux/comment";
import { getPostsThunk } from "../../redux/post";
import { useNavigate, useParams } from "react-router-dom";


const CreateComment = () => {
    const { postId } = useParams();
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [error, setError] = useState('');
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(body.length < 15) {
            setError("Comment must be at least 15 characters long");
            return;
        }

        if (!user) {
            setError("You must be logged in to post a comment.");
            setTimeout(() => {
                navigate('/login');
                closeModal()
            }, 3000);
            return;
        }

        const newComment = {
            body: body,
        };

        const response = await dispatch(createCommentThunk(postId, newComment));
        console.log(response)
        if (!response.errors) {
            await dispatch(getPostsThunk());
            closeModal();

        } else {
            console.error("Failed to create comment:", response.errors);
            setError("Failed to create comment. Please try again.");
        }
    }

    return (
        <div className="create-comment-modal">

            <div className="modal-content">
                <span className="close" onClick={closeModal}></span>
                <h2> Write your comment here: </h2>
                <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
                />
                {error && <p className="error-message">{error}</p>}
            </div>
            <button onClick={handleSubmit}> Submit </button>

    </div>
    )

}

export default CreateComment;
