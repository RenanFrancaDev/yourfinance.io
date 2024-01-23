"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "./style";

const GoalUpdate = ({ goalId }) => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
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
          message: error.response.data.error,
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
      const response = await axios.put(
        `http://localhost:4000/goals/${goalId}`,
        { description, amount, date, user_id: userId },
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
        <S.H1>Update Goal</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="description"
          id="description"
          label="Description"
          variant="outlined"
          color="primary"
          value={description}
        />

        <S.TextField
          onChange={onChangeValue}
          name="amount"
          id="amount"
          label="Value"
          variant="outlined"
          color="primary"
          value={amount}
        />

        <S.TextField
          onChange={onChangeValue}
          name="date"
          id="date"
          label="Date"
          variant="outlined"
          color="primary"
          value={date}
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

export default GoalUpdate;
