"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CategoriesCreate from "@/components/Categories/CategoriesCreate";
// import CategoriesUpdate from "@/components/Categories/CategoriesUpdate";
// import GoalsCreated from "@/components/Goals/GoalsCreate";
// import GoalsUpdate from "@/components/Goals/GoalsUpdate";
// import TransactionsCreate from "@/components/Transactions/TransactionsCreate";
// import TransactionsUpdate from "@/components/Transactions/TransactionsUpdate";

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
      .then((response) => console.log(response.data.data))
      .catch((error) => {
        window.location.href = "/login";
      });
  });

  return (
    <div>
      <h1>dash</h1>
      <CategoriesCreate />
    </div>
  );
};

export default DashboardPage;
