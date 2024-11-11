"use client";

import { useState, useEffect } from "react";
import JankenGameScreen from "./components/JankenGameScreen";
import ScoreboardScreen from "./components/ScoreboardScreen";
import { choices, ChoiceType } from "./components/choices";

export default function Home() {
  const rules = `使ったカードが交換されるカードゲーム
    5回負けるまでのスコアを競う
    最強の手札を作りながら連勝を目指せ！
    `;

  const [screen, setScreen] = useState<"start" | "game" | "scoreboard" | "rules">("start");
  const [playerChoices, setPlayerChoices] = useState<ChoiceType[]>([]);

  useEffect(() => {
    setPlayerChoices(choices.slice(0, 3));
  }, []);

  const handleStartClick = () => setScreen("game");
  const handleScoreboardClick = () => setScreen("scoreboard");
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
                backgroundColor: "#555555", // ダークグレー
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")} // ホバー時にさらに濃いグレー
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#555555")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              スタート
            </button>

            <div style={{ display: "flex", width: "100%", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleScoreboardClick}
                style={{
                  padding: "10px",
                  fontSize: "1rem",
                  backgroundColor: "#a9a9a9", // ライトグレー
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: 1,
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#8f8f8f")} // ホバー時に少し濃く
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#a9a9a9")}
              >
                スコアボード
              </button>
            </div>
            <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          color: "#333",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "90%",
          maxHeight: "80%",
          overflowY: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "left",
          whiteSpace: "pre-line",
        }}
      >
        {rules}
      </div></div>
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

      </div>
    </div>
  );
}
