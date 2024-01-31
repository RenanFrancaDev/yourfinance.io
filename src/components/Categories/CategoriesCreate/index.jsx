"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "./style";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CategoriesCreate = ({ openModal, closeModal }) => {
  const [name, setName] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

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
    }
  };

  const handleClose = () => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
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

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle style={{ textAlign: "center" }}>
          Criar Categoria
        </DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
            <S.TextField
              onChange={onChangeValue}
              name="name"
              id="name"
              label="Name"
              variant="outlined"
              color="primary"
            />
          </S.Form>
        </DialogContent>
        <DialogActions>
          <S.Button onClick={handleCloseModal} variant="contained">
            Cancel
          </S.Button>
          <S.Button type="submit" variant="contained" onClick={onSubmit}>
            Save
          </S.Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriesCreate;
