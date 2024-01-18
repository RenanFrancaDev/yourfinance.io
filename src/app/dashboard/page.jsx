"use client";

import { useEffect } from "react";
import axios from "axios";
// import CategoriesCreate from "@/components/Categories/CategoriesCreate";
import CategoriesUpdate from "@/components/Categories/CategoriesUpdate";

const DashboardPage = () => {
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
      <CategoriesUpdate categoryId={1} />
    </div>
  );
};

export default DashboardPage;
