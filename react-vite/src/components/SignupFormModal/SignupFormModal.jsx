import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
    }
    if (username.length < 5) {
      errors.username =
        "Username field must be between 5 to 15 characters long";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
        )
    ) {
      errors.email = "Email must be in a valid format";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-container">
      <h1 className="sign-up">Sign Up</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
  
}

export default SignupFormModal;
