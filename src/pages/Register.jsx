import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = () => {
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    alert("Fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];
  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    alert(
      "An account with this email already exists"
    );
    return;
  }
  users.push({
    name,
    email,
    password
  });

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
  localStorage.setItem(
  "currentUser",
  JSON.stringify({
    name,
    email,
    password
  })
 );

  alert("Registration Successful");

  navigate("/dashboard");
 };
 useEffect(() => {
  document.body.classList.remove(
    "dark-mode"
  );
  }, []);
  return (
    <div className="auth-container">

      <div className="brand">
        <img src="/logo1.png" alt="logo" />
        <h2>TaskFlow</h2>
      </div>

      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">
          Organize your tasks and boost productivity
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
}

export default Register;