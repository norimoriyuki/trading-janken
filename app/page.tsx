"use client";

import { useState, useEffect } from "react";
import JankenGameScreen from "./components/JankenGameScreen";
import ScoreboardScreen from "./components/ScoreboardScreen"; // スコアボード画面コンポーネント
import RulesScreen from "./components/RulesScreen"; // ルール画面コンポーネント
import { choices, ChoiceType } from "./components/choices";

export default function Home() {
  const [screen, setScreen] = useState<"start" | "game" | "scoreboard" | "rules">("start");
  const [playerChoices, setPlayerChoices] = useState<ChoiceType[]>([]);

  useEffect(() => {
    setPlayerChoices(choices.slice(0, 3));
  }, []);

  const handleStartClick = () => setScreen("game");
  const handleScoreboardClick = () => setScreen("scoreboard");
  const handleRulesClick = () => setScreen("rules");
  const handleBackClick = () => setScreen("start");

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          aspectRatio: "9 / 16",
          backgroundColor: "#6b8e23",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
        }}
      >
        {screen === "start" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Trading Janken</h1>
            <button onClick={handleStartClick} style={{ marginTop: "20px", padding: "10px 20px" }}>
              スタート
            </button>
            <button onClick={handleScoreboardClick} style={{ marginTop: "10px", padding: "10px 20px" }}>
              スコアボード
            </button>
            <button onClick={handleRulesClick} style={{ marginTop: "10px", padding: "10px 20px" }}>
              ルール
            </button>
          </div>
        )}

        {screen === "game" && (
          <JankenGameScreen
            onBackClick={handleBackClick}
            playerChoices={playerChoices}
          />
        )}

        {screen === "scoreboard" && (
          <ScoreboardScreen onBackClick={handleBackClick} />
        )}

        {screen === "rules" && (
          <RulesScreen onBackClick={handleBackClick} />
        )}
      </div>
    </div>
  );
}
