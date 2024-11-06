import React from "react";

interface RulesScreenProps {
  onBackClick: () => void;
}

const RulesScreen: React.FC<RulesScreenProps> = ({ onBackClick }) => {
  const dummyRules = `
    Trading Jankenのルール:
    
    1. このゲームはグー、チョキ、パーのじゃんけんをベースにしています。
    2. プレイヤーは、3つの手札から一つを選択し、コンピュータと対戦します。
    3. 勝利条件:
       - グーはチョキに勝つ。
       - チョキはパーに勝つ。
       - パーはグーに勝つ。
    4. プレイヤーは勝利するたびにスコアが加算されます。
    5. ライフがゼロになるとゲームオーバーとなり、スコアが登録されます。
    6. 特殊カード「バリアー」は一度だけ使用でき、引き分けを保証します。

    これらのルールを守って楽しんでください！
  `;

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
      <h1 style={{ marginBottom: "20px" }}>ルール</h1>
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
          whiteSpace: "pre-line",
        }}
      >
        {dummyRules}
      </div>
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

export default RulesScreen;
