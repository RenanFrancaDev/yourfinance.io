"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";
import Grid from "@mui/material/Grid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AdsClickIcon from "@mui/icons-material/AdsClick";

const Panel = () => {
  const [sum, setSum] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    date: new Date(),
  });
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const getGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals(response.data.data);
      } catch (_) {}
    };

    getGoals();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;

        let objectBalance = {
          balance: 0,
          income: 0,
          expense: 0,
          date: new Date(),
        };
        for (let i = 0; i < data.length; i++) {
          const dateObj = new Date(data[i].date).getFullYear();
          objectBalance.date = dateObj;

          if (data[i].type === "Expense") {
            objectBalance.expense += data[i].amount;
          }

          if (data[i].type === "Income") {
            objectBalance.income += data[i].amount;
          }

          objectBalance.balance = objectBalance.income - objectBalance.expense;
        }
        setSum(objectBalance);
      } catch (_) {}
    };
    getTransactions();
  }, []);

  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card label={"Balance"} value={`R$ ${sum.balance / 100}`}>
            <AccountBalanceWalletIcon />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card label={"Income"} value={`R$ ${sum.income / 100}`}>
            <SwapHorizIcon />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card label={"Expense"} value={`R$ ${sum.expense / 100}`}>
            <LocalAtmIcon />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card label={"Goals"} isGoal goals={goals} balance={sum.balance}>
            <AdsClickIcon />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Panel;
