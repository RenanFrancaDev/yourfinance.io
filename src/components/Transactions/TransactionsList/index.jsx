import { useEffect, useState } from "react";
import axios from "axios";
import { compareAsc, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import * as S from "./style";

export const TransacoesList = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTable, setTransactionsTable] = useState([]);
  const [type, setType] = useState("All");
  const [years, setYears] = useState(["All"]);
  const [year, setYear] = useState("All");

  useEffect(() => {
    const getTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const years = response.data.data
          .map((transaction) => new Date(transaction.date).getFullYear())
          .filter((year, index, years) => years.indexOf(year) === index)
          .sort((a, b) => a - b);
        setYears(["All", ...years]);

        setTransactions(response.data.data);
        setTransactionsTable(response.data.data);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getTransacoes();
  }, []);

  useEffect(() => {
    if (year === "All") {
      if (type === "All") {
        setTransactionsTable(transactions);
      }
      if (type === "Income") {
        const income = transactions.filter(
          (transaction) => transaction.type === "Income"
        );
        setTransactionsTable(income);
      }
      if (type === "Expense") {
        const expense = transactions.filter(
          (transaction) => transaction.type === "Expense"
        );
        setTransactionsTable(expense);
      }
    } else {
      if (type === "All") {
        const todas = transactions.filter(
          (transaction) =>
            new Date(transaction.date).getFullYear() === Number(year)
        );
        setTransactionsTable(todas);
      }
      if (type === "Income") {
        const income = transactions.filter(
          (transaction) =>
            transaction.type === "Income" &&
            new Date(transaction.date).getFullYear() === Number(year)
        );
        setTransactionsTable(income);
      }
      if (type === "Expense") {
        const expense = transactions.filter(
          (transaction) =>
            transaction.type === "Expense" &&
            new Date(transaction.date).getFullYear() === Number(year)
        );
        setTransactionsTable(expense);
      }
    }
  }, [type, transactions, year]);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "year") setYear(value);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "15px", margin: "30px 0" }}>
        <div onClick={() => setType("All")}>All</div>
        <div onClick={() => setType("Income")}>Income</div>
        <div onClick={() => setType("Expense")}>Expense</div>
      </div>
      <S.FormControl>
        <S.InputLabel id="year_select">Years</S.InputLabel>
        <S.Select
          labelId="years"
          id="year_select"
          name="year"
          label="Years"
          value={year}
          onChange={onChangeValue}
        >
          {years.map((yearDisponivel) => (
            <S.MenuItem key={yearDisponivel} value={yearDisponivel}>
              {yearDisponivel}
            </S.MenuItem>
          ))}
        </S.Select>
      </S.FormControl>
      <S.TableContainer component={S.Paper}>
        <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <S.TableHead>
            <S.TableRow>
              <S.TableCell>Descrição</S.TableCell>
              <S.TableCell align="right">Transaction</S.TableCell>
              <S.TableCell align="right">Date</S.TableCell>
              <S.TableCell align="right">Situation</S.TableCell>
              <S.TableCell align="right">Value</S.TableCell>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {transactionsTable.map((transaction) => (
              <S.TableRow
                key={transaction.description}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <S.TableCell component="th" scope="row">
                  {transaction.description}
                </S.TableCell>
                <S.TableCell align="right">{transaction.type}</S.TableCell>
                <S.TableCell align="right">
                  {format(new Date(transaction.date), "d MMM, yyyy", {
                    locale: ptBR,
                  })}
                </S.TableCell>
                <S.TableCell align="right">
                  {compareAsc(new Date(), new Date(transaction.date)) === 1
                    ? "Realizada"
                    : "Planejada"}
                </S.TableCell>
                <S.TableCell align="right">
                  R$ {transaction.amount / 100}
                </S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableContainer>
    </>
  );
};

export default TransacoesList;
