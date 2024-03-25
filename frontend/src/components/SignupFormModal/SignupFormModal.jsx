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
      {submit && errors.email && <p className="error">{errors.email}</p>}
      {submit && errors.username && <p className="error">{errors.username}</p>}
      {submit && errors.firstName && (
        <p className="error">{errors.firstName}</p>
      )}
      {submit && errors.lastName && <p className="error">{errors.lastName}</p>}
      {submit && errors.password && <p className="error">{errors.password}</p>}
      {submit && errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}
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
//     const newErrors = {};

//     // Validate email
//     if (!email) {
//       newErrors.email = "Email is required";
//     }

//     // Validate username
//     if (!username) {
//       newErrors.username = "Username is required";
//     } else if (username.length < 4) {
//       newErrors.username = "Username must be at least 4 characters long";
//     }

//     // Validate first name
//     if (!firstName) {
//       newErrors.firstName = "First name is required";
//     }

//     // Validate last name
//     if (!lastName) {
//       newErrors.lastName = "Last name is required";
//     }

//     // Validate password
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//     }

//     // Validate confirmPassword
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm Password is required";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);

//     console.log("SET ERRORS NEW ERRORS==>", setErrors(newErrors));
//     if (Object.keys(newErrors).length === 0) {
//       setSubmit(true);
//       dispatch(
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
//   };
//   console.log("SET ERRORS", setErrors(data.errors));
//   console.log("ERRORS OBJ ==>", errors);
//   return (
//     <div className="signup-container">
//       <div className="signup-header">Sign Up</div>
//       {submit && (
//         <div>
//           {Object.keys(errors).map((key) => (
//             <p key={key} className="error">
//               {errors[key]}
//             </p>
//           ))}
//         </div>
//       )}
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

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import * as sessionActions from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);
//   const { closeModal } = useModal();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password === formData.confirmPassword) {
//       setErrors({});
//       setSubmit(true);
//       try {
//         const res = await dispatch(sessionActions.signup(formData));
//         if (res.ok) {
//           closeModal();
//         } else {
//           const data = await res.json();
//           if (data?.errors) {
//             setErrors(data.errors);
//           }
//         }
//       } catch (err) {
//         console.error("Error occurred during signup:", err);
//       }
//     } else {
//       setErrors({
//         confirmPassword:
//           "Confirm Password field must be the same as the Password field",
//       });
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-header">Sign Up</div>
//       {submit && errors.email && <p className="error">{errors.email}</p>}
//       {submit && errors.username && <p className="error">{errors.username}</p>}
//       {submit && errors.firstName && (
//         <p className="error">{errors.firstName}</p>
//       )}
//       {submit && errors.lastName && <p className="error">{errors.lastName}</p>}
//       {submit && errors.password && <p className="error">{errors.password}</p>}
//       {submit && errors.confirmPassword && (
//         <p className="error">{errors.confirmPassword}</p>
//       )}
//       <form onSubmit={handleSubmit} className="signup-form">
//         <label>
//           <input
//             className="signup-input"
//             placeholder="Email"
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           <input
//             placeholder="Username (minimum 4 characters)"
//             className="signup-input"
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           <input
//             placeholder="First Name"
//             className="signup-input"
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           <input
//             placeholder="Last Name"
//             className="signup-input"
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           <input
//             placeholder="Password (minimum 6 characters)"
//             className="signup-input"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           <input
//             placeholder="Confirm Password"
//             className="signup-input"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           disabled={
//             !formData.email ||
//             formData.username.length < 4 ||
//             !formData.firstName ||
//             !formData.lastName ||
//             formData.password.length < 6 ||
//             !formData.confirmPassword
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
