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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 送信中フラグ

  // スコアをサーバーに送信する関数
  const submitScore = async () => {
    if (playerName.trim() === "") {
      setErrorMessage("名前を入力してください");
      return;
    }

    setIsSubmitting(true); // 送信中に設定
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
    } finally {
      setIsSubmitting(false); // 送信完了後にリセット
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
        <h2>Score</h2>
        <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0" }}> {winCount}</p>
        <input
          type="text"
          placeholder="名前を入力してください"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            setErrorMessage(""); // テキスト変更時にエラーメッセージをクリア
          }}
          style={{ padding: "10px", margin: "10px 0", width: "90%" }}
          disabled={isSubmitting} // 送信中は入力無効
        />
        {errorMessage && (
          <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", flexDirection: 'column',alignItems:"center" }}>
            <button
                onClick={submitScore}
                style={{
                padding: "10px",
                width: "90%",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isSubmitting ? "#ccc" : "#555555",
                color: "white",
                border: "none"
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? "登録中..." : "スコアを登録"}
            </button>
            <button
                onClick={closeScoreWindow}
                style={{
                marginTop: "10px",
                padding: "10px",
                width: "90%",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: "#a9a9a9",
                color: "white",
                border: "none"
                }}
                disabled={isSubmitting}
            >
                登録せずに戻る
            </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreWindow;
