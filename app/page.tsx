"use client";

import { useState, useEffect } from "react";
import JankenGameScreen from "./components/JankenGameScreen";
import ScoreboardScreen from "./components/ScoreboardScreen";
import RulesScreen from "./components/RulesScreen";
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
        backgroundColor: "gray",
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
          backgroundColor: "#d3d3d3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          flexDirection: "column",
        }}
      >
        {screen === "start" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
            <h1>Trading Janken</h1>

            {/* スタートボタン */}
            <button
              onClick={handleStartClick}
              style={{
                marginTop: "20px",
                padding: "15px 30px",
                fontSize: "1.2rem",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e68900")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff9800")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              スタート
            </button>

            {/* スコアボードとルールボタン */}
            <div style={{ display: "flex", width: "100%", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleScoreboardClick}
                style={{
                  padding: "10px",
                  fontSize: "1rem",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: 1,
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
              >
                スコアボード
              </button>

              <button
                onClick={handleRulesClick}
                style={{
                  padding: "10px",
                  fontSize: "1rem",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: 1,
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
              >
                ルール
              </button>
            </div>
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
