import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSubmit(true);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = () => {
    setCredential("Demo-lition");
    setPassword("password");
    handleSubmit();
  };

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <>
      <div className="login-container">
        <h1>Log In</h1>
        {submit && errors.credential && (
          <p className="error">{errors.credential}</p>
        )}
        {submit && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {errors.credential && <p>{errors.credential}</p>}

          <button className="login-button" type="submit" disabled={isDisabled}>
            Log In
          </button>
          <button className="login-btn" onClick={handleDemoLogin}>
            Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
