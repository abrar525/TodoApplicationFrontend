import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const jwtToken = Cookies.get("jwtToken");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const userDetails = { email, password };
    if (email && password) {
      axios
        .post("https://todoapplication-obs9.onrender.com/login", userDetails)
        .then((res) => {
          const { jwtToken } = res.data;
          if (res.status === 200) {
            Cookies.set("jwtToken", jwtToken, { expires: 200 });
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            alert("Please Enter Valid Email");
          } else if (err.message === "Network Error") {
            alert("something went wrong");
          } else {
            alert("Please Enter Valid Password");
          }
        });
    } else {
      alert("Please Fill The Details");
    }
  };

  if (jwtToken !== undefined) {
    try {
      return <Navigate to="/" />;
    } catch (error) {
      console.log(error.message);
    }
  }

  const onClickNavigateRegister = () => {
    navigate("/register", { replace: true });
  };
  return (
    <div className="cont">
      <form className="formEl" onSubmit={onSubmitLogin}>
        <h1>Login</h1>
        <label htmlFor="IP2">EMAIL</label>
        <input
          type="email"
          className="inputEl"
          id="IP2"
          onChange={onChangeEmail}
          value={email}
        />
        <label htmlFor="IP3">PASSWORD</label>
        <input
          type="password"
          className="inputEl"
          id="IP3"
          onChange={onChangePassword}
          value={password}
        />
        <button type="submit" className="btns">
          Login
        </button>
        <p style={{ textAlign: "center" }}>OR</p>
        <button
          type="button"
          onClick={onClickNavigateRegister}
          className="btns"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
