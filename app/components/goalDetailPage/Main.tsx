"use client";

import { useEffect, useState } from "react";
import { MainView, MainContainer, MainBox, Page1Container } from "./main.styled.js";
import axios from "axios";

interface selectedGoalItemType {
  id: {
    goalId: string;
  };
  snippet: {
    title: string;
  };
}

export default function Main(props: { goalId: string }) {
  const [selectedGoal, setSelectedGoal] = useState<selectedGoalItemType[]>();
  useEffect(() => {
    axios.get("/data/goal.json").then(res => {
      for (let i in res.data.items) {
        if (res.data.items[i].id.goalId === props.goalId) {
          setSelectedGoal(res.data.items[i]);
          console.log(res.data.items[i]);
        }
      }
    });
  }, [setSelectedGoal]);

  return (
    <MainView>
      <MainContainer>
        <MainBox id="1">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Page1Container>{selectedGoal && <h2>{selectedGoal.snippet.title}</h2>}</Page1Container>
          </div>
        </MainBox>
        <MainBox id="2"></MainBox>
        <MainBox id="3"></MainBox>
      </MainContainer>
    </MainView>
  );
}
