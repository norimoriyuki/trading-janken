import React from "react";

interface ScoreWindowProps {
  winCount: number;
  playerName: string;
  setPlayerName: (name: string) => void;
  handleSubmitScore: () => void;
  closeScoreWindow: () => void;
}

const ScoreWindow: React.FC<ScoreWindowProps> = ({
  winCount,
  playerName,
  setPlayerName,
  handleSubmitScore,
  closeScoreWindow,
}) => {
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
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", width: "100%" }}
        />
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
          <button onClick={handleSubmitScore} style={{ padding: "10px 20px" }}>
            スコアを登録（まだ
          </button>
          <button onClick={closeScoreWindow} style={{ padding: "10px 20px" }}>
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreWindow;
