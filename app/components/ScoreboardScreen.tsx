import React, { useEffect, useState } from "react";

interface ScoreboardEntry {
  user_name: string;
  score: number;
  date: string;
}

interface ScoreboardScreenProps {
  onBackClick: () => void;
}

const ScoreboardScreen: React.FC<ScoreboardScreenProps> = ({ onBackClick }) => {
  const [scores, setScores] = useState<ScoreboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("/api/tj-score");
        const data = await response.json();

        // データのpostsプロパティが配列か確認し、配列なら設定
        if (Array.isArray(data.posts)) {
          setScores(data.posts);
        } else {
          console.error("Expected 'posts' to be an array but received:", data);
          setScores([]); // エラー時は空の配列を設定
        }
      } catch (error) {
        console.error("Failed to fetch scores:", error);
        setScores([]); // エラーハンドリング時も空の配列を設定
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
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
      <h1 style={{ marginBottom: "20px" }}>スコアボード</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div
          style={{
            backgroundColor: "#fff",
            color: "#333",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "90%",
            maxHeight: "60%",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "left",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>順位</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>プレイヤー名</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>スコア</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>記録日</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{index + 1}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{entry.user_name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{entry.score}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{new Date(entry.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "Asia/Tokyo",
                    })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={onBackClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6b8e23",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        戻る
      </button>
    </div>
  );
};

export default ScoreboardScreen;
