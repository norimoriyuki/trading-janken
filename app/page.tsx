"use client";

import { useState, useEffect } from "react";
import JankenGameScreen from "./components/JankenGameScreen";
import { choices, ChoiceType } from "./components/choices"; // インポート

export default function Home() {
  const [isStartScreen, setIsStartScreen] = useState(true);
  //const [results, setResults] = useState({ win: 0, lose: 0, draw: 0 });
  const [playerChoices, setPlayerChoices] = useState<ChoiceType[]>([]);

  useEffect(() => {
    setPlayerChoices(choices.slice(0, 3));
  }, [choices]);

  const handleStartClick = () => setIsStartScreen(false);
  const handleBackClick = () => setIsStartScreen(true);

  //const updateResults = (result: "win" | "lose" | "draw") => {
    //setResults((prev) => ({ ...prev, [result]: prev[result] + 1 }));
  //};

  return (
    <div style={{ height: "100vh", width: "100%", overflowY: "scroll", backgroundColor: "#ccc", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          aspectRatio: "9 / 16",
          backgroundColor: "green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
        }}
      >
        {isStartScreen ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>トレーディングじゃんけん</h1>
            <button onClick={handleStartClick} style={{ marginTop: "20px", padding: "10px 20px" }}>
              スタート
            </button>
          </div>
        ) : (
          <JankenGameScreen
            onBackClick={handleBackClick}
            playerChoices={playerChoices}
          />
        )}
      </div>
    </div>
  );
}
