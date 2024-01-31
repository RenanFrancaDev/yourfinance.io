"use client";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as S from "./style";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NumericFormat } from "react-number-format";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
});

const TransactionsCreate = ({ openModal, closeModal }) => {
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
    // if (name === "date") setDate(value);
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
          amount: amount * 100,
          date: formatISO(date, { representation: "date", locale: ptBR }),
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
        message: "error.response.data.error",
        severity: "error",
      });
    }
  };

  const handleClose = (_, reason) => {
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

      <Dialog open={open} onClose={handleCloseModal} adapterLocale={ptBR}>
        <DialogTitle style={{ textAlign: "center" }}>
          Criar Categoria
        </DialogTitle>
        <DialogContent>
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
            {category}

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
                <S.MenuItem value="Income">Income</S.MenuItem>
              </S.Select>
            </S.FormControl>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <DatePicker onChange={(newValue) => setDate(newValue)} />
            </LocalizationProvider>
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

export default TransactionsCreate;
