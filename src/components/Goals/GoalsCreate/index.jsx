"use client";
import axios from "axios";
import { useState } from "react";
import * as S from "./style";

const GoalsCreated = () => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "description") setDescription(value);
    if (name === "amount") setAmount(value);
    if (name === "date") setDate(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/goals",
        { description, amount, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Goal ${description} successfully registered!`,
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
      severity: "info",
    });
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.H1>Create Goal</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="description"
          id="description"
          label="Name"
          variant="outlined"
          color="primary"
        />

        <S.TextField
          onChange={onChangeValue}
          name="amount"
          id="amount"
          label="Value"
          variant="outlined"
          color="primary"
        />

        <S.TextField
          onChange={onChangeValue}
          name="date"
          id="date"
          label="Date"
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

export default GoalsCreated;
