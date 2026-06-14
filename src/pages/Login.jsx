import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {

  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (user) {

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    navigate("/dashboard");

  } else {

    alert(
      "Invalid Email or Password"
    );

  }

 };
 useEffect(() => {
  document.body.classList.remove(
    "dark-mode"
  );
  }, []);
  return (
    <div className="auth-container">
      <div className="brand">
        <img src="/logo.jpg" alt="logo" />
        <h2>TaskFlow</h2>
      </div>
      <div className="auth-card">
        <h1>Task Manager</h1>

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

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;