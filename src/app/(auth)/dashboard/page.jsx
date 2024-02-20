"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import CategoriesCreate from "@/components/Categories/CategoriesCreate";
// import CategoriesUpdate from "@/components/Categories/CategoriesUpdate";
// import GoalsCreated from "@/components/Goals/GoalsCreate";
// import GoalsUpdate from "@/components/Goals/GoalsUpdate";
// import TransactionsCreate from "@/components/Transactions/TransactionsCreate";
// import TransactionsUpdate from "@/components/Transactions/TransactionsUpdate";
import Chart from "@/components/Chart";
import Panel from "@/components/Panel";

const DashboardPage = () => {
  const [user, setUser] = useState({
    id: null,
  });
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
    <div style={{ margin: "30px 30px" }}>
      <h2> Olá, {user.name}</h2>
      <Panel />
      <div style={{ marginLeft: "80px" }}>
        <Chart />
      </div>
    </div>
  );
};

export default DashboardPage;
