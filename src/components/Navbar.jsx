import { BsSunFill,BsMoonStarsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Navbar({
  darkMode,
  setDarkMode
}) {
  const currentUser =
  JSON.parse(
    localStorage.getItem("currentUser")
  );
  const navigate = useNavigate();
  const handleLogout = () => {

  localStorage.removeItem(
    "currentUser"
  );

  navigate("/");
 };
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/logo1.png" alt="logo" />
        <h2>TaskFlow</h2>
      </div>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
        </button>
        <div className="user-profile">

          <div className="user-avatar">
            {currentUser?.name?.charAt(0)}
          </div>

          <span>
            {currentUser?.name}
          </span>

        </div>
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;