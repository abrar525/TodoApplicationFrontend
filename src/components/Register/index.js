import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import "./index.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitRegisterForm = (event) => {
    event.preventDefault();

    const userDetails = { name: username, email, password };

    const url = "https://todoapplication-obs9.onrender.com/register";

    if (username && email && password) {
      axios.post(url, userDetails).then((res) => {
        if (
          res.data.message ===
          "SQLITE_CONSTRAINT: UNIQUE constraint failed: Users.email"
        ) {
          alert("Please Provide Another Email");
        } else {
          alert("Registration Successfull");
        }
      });
    } else {
      alert("Please Fill The Details");
    }
  };

  const onClickNavigateLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="cont">
      <form className="formEl" onSubmit={onSubmitRegisterForm}>
        <h1>Register</h1>
        <label htmlFor="IP1">NAME</label>
        <input
          type="text"
          className="inputEl"
          id="IP1"
          value={username}
          onChange={onChangeName}
        />
        <label htmlFor="IP2">EMAIL</label>
        <input
          type="email"
          className="inputEl"
          id="IP2"
          value={email}
          onChange={onChangeEmail}
        />
        <label htmlFor="IP3">PASSWORD</label>
        <input
          type="password"
          className="inputEl"
          id="IP3"
          value={password}
          onChange={onChangePassword}
        />
        <button type="submit" className="btns">
          Register
        </button>
        <p style={{ textAlign: "center" }}>OR</p>
        <button type="button" onClick={onClickNavigateLogin} className="btns">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
