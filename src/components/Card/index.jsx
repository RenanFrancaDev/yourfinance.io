"use client";

import Icon from "@mui/material/Icon";
import { useEffect, useState } from "react";

import * as S from "./style";

const Card = ({ children, label, value, isGoal, goals = [], balance = 0 }) => {
  const [goal, setGoal] = useState("");

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "goal") setGoal(value);
  };

  //   console.log("goal", goal);

  return (
    <S.ChartContainer>
      <S.IconWraper>
        <Icon sx={{ color: "#fff" }}>{children}</Icon>
      </S.IconWraper>
      <S.Content>
        <S.Content>{label}</S.Content>

        {!isGoal && <S.Content style={{ fontWeight: 600 }}>{value}</S.Content>}
        {isGoal && (
          <S.Content style={{ fontWeight: 600 }}>{`${(
            ((goal - balance) / goal) *
            100
          ).toFixed(0)}%`}</S.Content>
        )}
      </S.Content>
      {isGoal && (
        <S.FormControl fullWidth>
          <S.InputLabel id="goal">Goal</S.InputLabel>
          <S.Select
            labelId="goal"
            id="goal_select"
            name="goal"
            value={goal}
            label="Goal"
            onChange={onChangeValue}
          >
            {goals.map((goal) => (
              <S.MenuItem key={goal.id} value={goal.amount}>
                {goal.description}
              </S.MenuItem>
            ))}
          </S.Select>
        </S.FormControl>
      )}
    </S.ChartContainer>
  );
};

export default Card;
