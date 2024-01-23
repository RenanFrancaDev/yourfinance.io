"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./style";

const TransactionsCreate = () => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [typeTransaction, setTypeTransaction] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

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
        console.log(error);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/transactions",
        {
          description,
          amount,
          date,
          type: typeTransaction,
          category_id: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Transaction ${description} successfully registered!`,
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
        <S.H1>Create Transaction</S.H1>
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
            <S.MenuItem value="despesa">Despesa</S.MenuItem>
            <S.MenuItem value="receita">Receita</S.MenuItem>
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

export default TransactionsCreate;
