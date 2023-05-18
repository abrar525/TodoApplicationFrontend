import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    const jwtToken = Cookies.remove("jwtToken");
    navigate("/login", { replace: true });
  };
  return (
    <div className="header-container">
      <h1 className="todos-heading">Todos</h1>
      <button className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
