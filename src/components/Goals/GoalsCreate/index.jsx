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

const GoalsCreated = ({ openModal, closeModal }) => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(new Date());

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(openModal);
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
    if (name === "description") setDescription(value);
    if (name === "amount") setAmount(value);
    // if (name === "date") setDate(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/goals",
        {
          description,
          amount: amount * 100,
          date: formatISO(date, { representation: "date", locale: ptBR }),
        },
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
        <DialogTitle style={{ textAlign: "center" }}>Create Goal</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
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
              label="Value"
              name="amount"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
            />

            {formatISO(date, { representation: "date", locale: ptBR })}

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

export default GoalsCreated;
