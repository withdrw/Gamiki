import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
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
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(
      thunkLogin({ email: "demo@aa.io", password: "password" })
    );
    if (demoUser) {
      setErrors(demoUser);
    } else {
      closeModal();
    }
    navigate("/");
  };

  return (
    <div className="login-main-container">
      <h1 className="login-class">Log In</h1>
      <form className="login-modal" onSubmit={handleSubmit}>
        <label className="label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button type="submit">Log In</button>
        <button
          className="signup-modal"
          onClick={(e) => handleDemoLogin(e)}
          type="button"
        >
          Login as demo user
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
