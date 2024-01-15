"use client";
import axios from "axios";
import { useState } from "react";
import * as S from "./style";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <S.H1>Login Form</S.H1>
      <S.TextField
        onChange={onChangeValue}
        name="email"
        id="email"
        label="E-mail"
        variant="outlined"
        color="primary"
      />
      <S.TextField
        onChange={onChangeValue}
        name="password"
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        color="primary"
      />
      <S.Button type="submit">Login</S.Button>
    </form>
  );
};

export default LoginForm;
