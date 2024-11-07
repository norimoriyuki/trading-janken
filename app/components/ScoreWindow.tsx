import React, { useState } from "react";

interface ScoreWindowProps {
  winCount: number;
  closeScoreWindow: () => void;
}

const ScoreWindow: React.FC<ScoreWindowProps> = ({
  winCount,
  closeScoreWindow,
}) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // スコアをサーバーに送信する関数
  const submitScore = async () => {
    if (playerName.trim() === "") {
      setErrorMessage("名前を入力してください");
      return;
    }

    const payload = { user_name: playerName, score: winCount };

    try {
      const response = await fetch("/api/tj-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // スコア送信が成功したらタイトル画面に戻る
        closeScoreWindow();
      } else {
        console.error("Failed to submit score");
      }
    } catch (error) {
      console.error("An error occurred while submitting the score", error);
    }
  };

  return (
    <div
      style={{
        color: "black",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        <h2>スコア登録</h2>
        <p>勝利回数: {winCount}</p>
        <input
          type="text"
          placeholder="名前を入力してください"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            setErrorMessage(""); // テキスト変更時にエラーメッセージをクリア
          }}
          style={{ padding: "10px", margin: "10px 0", width: "100%" }}
        />
        {errorMessage && (
          <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>
        )}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
          <button onClick={submitScore} style={{ padding: "10px 20px" }}>
            スコアを登録
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
          <button onClick={closeScoreWindow} style={{ padding: "10px 20px" }}>
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreWindow;
