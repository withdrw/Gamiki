import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  // const handleNavigate =  () => {
  //   navigate('/signup')
  // }


  // const handleDemoLogin =  async (e) => {
  //   e.preventDefault()
  //   const demoUser = await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
  //   if (demoUser) {
  //     setErrors(demoUser)
  //   }
  //   navigate('/')

  // }

  return (
    <div className="login-page">
      <h1 className="loginPage-header">Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="loginPage-errs">
          {errors.email && <p>{errors.email}</p>}
        </div>
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="loginPage-errs">
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="loginPage-btns">
          <button className="loginpg-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
