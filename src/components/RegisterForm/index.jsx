"use client";
import axios from "axios";
import { useState } from "react";
import * as S from "./style";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name == "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.H1>Sign Up</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="name"
          id="name"
          label="Name"
          variant="outlined"
          color="primary"
        />
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
        <S.Button type="submit" variant="contained">
          Register
        </S.Button>
      </S.Form>
      <S.Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </S.Button>
      <S.Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <S.Alert variant="filled" severity="success">
          user successfully registered!
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default RegisterForm;
