"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./style";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setNotification({
        open: true,
        message: `user ${email} successfully registered!`,
        severity: "success",
      });
      router.push("/dashboard");
    } catch (error) {
      setNotification({
        open: true,
        message: "error",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.Typography variant="h1" color="primary">
          YOURfinance.IO
        </S.Typography>
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
          Login
        </S.Button>
        <S.Link href="/register">Create account</S.Link>
      </S.Form>

      <S.Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <S.Alert
          onClose={handleClose}
          variant="filled"
          severity={notification.severity}
        >
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
