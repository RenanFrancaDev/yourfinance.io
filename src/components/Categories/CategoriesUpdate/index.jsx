"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "./style";

const CategoriesUpdate = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/categories/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.data.name);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: "error",
          severity: "error",
        });
      }
    };
    getCategory();
  }, [categoryId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/categories/${categoryId}`,
        { name, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Category ${name} successfully updated!`,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: response.data.data.error,
        severity: "error",
      });

      console.log("error", error);
    }
  };

  const handleClose = () => {
    setNotification({
      open: false,
      message: "",
      severity: "info",
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
          value={name}
        />

        <S.Button type="submit" variant="contained">
          Update
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

export default CategoriesUpdate;
