"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "./style";

const TransactionsUpdate = ({ transactionId }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [typeTransaction, setTypeTransaction] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        setNotification({
          open: true,
          message: "error",
          severity: "error",
        });
      }
    };
    getCategories();
  }, []);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "description") setDescription(value);
    if (name === "amount") setAmount(value);
    if (name === "date") setDate(value);
    if (name === "type") setTypeTransaction(value);
    if (name === "category") setCategory(value);
  };

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/transactions/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDescription(response.data.data.description);
        setAmount(response.data.data.amount);
        setDate(response.data.data.date);
        setTypeTransaction(response.data.data.type);
        setCategory(response.data.data.category_id);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: "error",
          severity: "error",
        });
      }
    };
    getTransaction();
  }, [transactionId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/transactions/${transactionId}`,
        {
          description,
          amount,
          date,
          type: typeTransaction,
          category_id: category,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Transaction ${description} successfully updated!`,
        severity: "success",
      });
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
      severity: "info",
    });
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.H1>Create Transaction</S.H1>
        <S.TextField
          onChange={onChangeValue}
          name="description"
          id="description"
          value={description}
          label="Name"
          variant="outlined"
          color="primary"
        />
        <S.TextField
          onChange={onChangeValue}
          name="amount"
          id="amount"
          value={amount}
          label="Value"
          variant="outlined"
          color="primary"
        />
        <S.TextField
          onChange={onChangeValue}
          name="date"
          id="date"
          value={date}
          label="Date"
          variant="outlined"
          color="primary"
        />
        <S.FormControl>
          <S.InputLabel id="category">Category</S.InputLabel>
          <S.Select
            name="category"
            labelId="category"
            id="category"
            value={category}
            label="Category"
            onChange={onChangeValue}
          >
            {categories.map((category) => (
              <S.MenuItem key={category.id} value={category.id}>
                {category.name}
              </S.MenuItem>
            ))}
          </S.Select>
        </S.FormControl>

        <S.FormControl>
          <S.InputLabel id="type">Type</S.InputLabel>
          <S.Select
            name="type"
            labelId="type"
            id="type"
            value={typeTransaction}
            label="Type"
            onChange={onChangeValue}
          >
            <S.MenuItem value="Expense">Expense</S.MenuItem>
            <S.MenuItem value="income">Income</S.MenuItem>
          </S.Select>
        </S.FormControl>

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

export default TransactionsUpdate;
