import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

export const Chart = () => {
  const [dataset, setDataset] = useState([]);

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

        let objectYears = {};
        for (let i = 0; i < data.length; i++) {
          const dateObj = new Date(data[i].date).getFullYear();

          if (!objectYears[`${dateObj}`]) {
            objectYears[`${dateObj}`] = { income: 0, expense: 0 };

            objectYears[`${dateObj}`][`${data[i].type.toLowerCase()}`] =
              data[i].amount;
          } else {
            objectYears[`${dateObj}`][`${data[i].type.toLowerCase()}`] +=
              data[i].amount;
          }
        }

        const dataset = [];

        for (const [key, value] of Object.entries(objectYears)) {
          dataset.push({
            year: key,
            income: value.income ?? 0,
            expense: value.expense ?? 0,
          });
        }

        setDataset(dataset);
      } catch (_) {}
    };
    getTransactions();
  }, []);

  const chartSetting = {
    height: 400,
    width: 900,
  };

  const valueFormatter = (value) => `R$ ${value / 100}`;

  return (
    <>
      {dataset.length ? (
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "year" }]}
          series={[
            { dataKey: "income", label: "Income", valueFormatter },
            { dataKey: "expense", label: "Expense", valueFormatter },
          ]}
          {...chartSetting}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Chart;
