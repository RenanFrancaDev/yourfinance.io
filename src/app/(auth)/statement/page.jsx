"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CategoriesCreate from "@/components/Categories/CategoriesCreate";
import GoalsCreated from "@/components/Goals/GoalsCreate";
import TransactionsCreate from "@/components/Transactions/TransactionsCreate";
import TransactionsList from "@/components/Transactions/TransactionsList";

const StatementPage = () => {
  const [user, setUser] = useState({
    id: null,
  });
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalGoal, setOpenModalGoal] = useState(false);
  const [openModalTransactions, setOpenModalTransactions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get("http://localhost:4000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUser(response.data.data))
      .catch((error) => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => setOpenModalTransactions(true)}
        style={{ marginRight: "10px" }}
      >
        New Transaction
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => setOpenModalCategory(true)}
        style={{ marginRight: "10px" }}
      >
        New Category
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => setOpenModalGoal(true)}
        style={{ marginRight: "10px" }}
      >
        New Goal
      </Button>
      <TransactionsList />
      <CategoriesCreate
        openModal={openModalCategory}
        closeModal={setOpenModalCategory}
      />
      <GoalsCreated openModal={openModalGoal} closeModal={setOpenModalGoal} />
      <TransactionsCreate
        openModal={openModalTransactions}
        closeModal={setOpenModalTransactions}
      />
    </>
  );
};

export default StatementPage;
