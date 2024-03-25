// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import * as sessionActions from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors({});
//       setSubmit(true);
//       return dispatch(
//         sessionActions.signup({
//           email,
//           username,
//           firstName,
//           lastName,
//           password,
//         })
//       )
//         .then(closeModal)
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data?.errors) {
//             setErrors(data.errors);
//           }
//         });
//     }
//     console.log("SET ERRORS OBJ ==>", setErrors());
//     return setErrors({
//       confirmPassword:
//         "Confirm Password field must be the same as the Password field",
//     });
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-header">Sign Up</div>

//       <form onSubmit={handleSubmit} className="signup-form">
//         <label>
//           <input
//             className="signup-input"
//             placeholder="Email"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         {submit && errors.email && <p className="error">{errors.email}</p>}
//         <label>
//           <input
//             placeholder="Username (minimum 4 characters)"
//             className="signup-input"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>

//         {submit && errors.username && (
//           <p className="error">{errors.username}</p>
//         )}
//         <label>
//           <input
//             placeholder="First Name"
//             className="signup-input"
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         {submit && errors.firstName && (
//           <p className="error">{errors.firstName}</p>
//         )}
//         <label>
//           <input
//             placeholder="Last Name"
//             className="signup-input"
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         {submit && errors.lastName && (
//           <p className="error">{errors.lastName}</p>
//         )}

//         <label>
//           <input
//             placeholder="Password (minimum 6 characters)"
//             className="signup-input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {submit && errors.password && (
//           <p className="error">{errors.password}</p>
//         )}

//         <label>
//           <input
//             placeholder="Confirm Password"
//             className="signup-input"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         {submit && errors.confirmPassword && (
//           <p className="error">{errors.confirmPassword}</p>
//         )}
//         <button
//           type="submit"
//           disabled={
//             !email.length ||
//             username.length < 4 ||
//             !firstName.length ||
//             !lastName.length ||
//             password.length < 6 ||
//             !confirmPassword.length
//           }
//           className="signup-btn"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignupFormModal;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      setSubmit(true);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    console.log("SET ERRORS OBJ ==>", setErrors());
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-header">Sign Up</div>

      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          <input
            className="signup-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {submit &&
          errors.email &&
          errors.email.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        <label>
          <input
            placeholder="Username (minimum 4 characters)"
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        {submit &&
          errors.username &&
          errors.username.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        <label>
          <input
            placeholder="First Name"
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {submit &&
          errors.firstName &&
          errors.firstName.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        <label>
          <input
            placeholder="Last Name"
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {submit &&
          errors.lastName &&
          errors.lastName.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}

        <label>
          <input
            placeholder="Password (minimum 6 characters)"
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {submit &&
          errors.password &&
          errors.password.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}

        <label>
          <input
            placeholder="Confirm Password"
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {submit &&
          errors.confirmPassword &&
          errors.confirmPassword.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        <button
          type="submit"
          disabled={
            !email.length ||
            username.length < 4 ||
            !firstName.length ||
            !lastName.length ||
            password.length < 6 ||
            !confirmPassword.length
          }
          className="signup-btn"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
