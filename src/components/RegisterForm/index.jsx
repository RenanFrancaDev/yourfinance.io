"use client";
import axios from "axios";
import { useState } from "react";
import * as S from "./style";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.Typography variant="h1" color="primary">
          YOURfinance.IO
        </S.Typography>
        <S.Typography variant="h2">Create account</S.Typography>
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
        <S.FormControl fullWidth variant="outlined">
          <S.InputLabel htmlFor="outlined-adornment-password">
            Password
          </S.InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
            name="password"
            onChange={onChangeValue}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </S.InputAdornment>
            }
            label="Password"
          />
        </S.FormControl>
        <S.Button type="submit" variant="contained">
          Sign up
        </S.Button>
        <div>
          Already have an account? <S.Link href="/login">Login here</S.Link>
        </div>
      </S.Form>
      <S.Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <S.Alert variant="filled" severity="success">
          user successfully registered!
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default RegisterForm;
