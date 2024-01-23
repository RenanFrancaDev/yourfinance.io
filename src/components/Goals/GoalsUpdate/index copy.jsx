"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./style";

const GoalsUpdate = ({ goalId }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    const getGoal = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/goals/${goalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDescription(response.data.data.description);
        setAmount(response.data.data.amount);
        setDate(response.data.data.date);
        setUserId(response.data.data.user_id);
      } catch (error) {
        console.log(error);
        setNotification({
          open: true,
          message: "error",
          severity: "error",
        });
      }
    };
    getGoal();
  }, [goalId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/goals/${goalId}`,
        { description, amount, date, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Goal ${description} successfully updated!`,
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
        <S.H1>Update Goal</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="description"
          id="description"
          label="Name"
          variant="outlined"
          value={description}
          color="primary"
        />

        <S.TextField
          onChange={onChangeValue}
          name="amount"
          id="amount"
          label="Value"
          variant="outlined"
          value={amount}
          color="primary"
        />

        <S.TextField
          onChange={onChangeValue}
          name="date"
          id="date"
          label="Date"
          variant="outlined"
          value={date}
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

export default GoalsUpdate;
