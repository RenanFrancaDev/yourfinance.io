"use client";
import axios from "axios";
import { useState } from "react";
import * as S from "./style";

const CategoriesCreate = () => {
  const [name, setName] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/categories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Category ${name} successfully registered!`,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });

      console.log("error", error);
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
        <S.H1>Criar Categoria</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="name"
          id="name"
          label="Name"
          variant="outlined"
          color="primary"
        />

        <S.Button type="submit" variant="contained">
          Register
        </S.Button>
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

export default CategoriesCreate;
