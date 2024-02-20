"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

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
      .then((response) => router.push("/dashboard"))
      .catch((error) => {
        router.push("/login");
      });
  }, [router]);

  return null;
};

export default Home;
