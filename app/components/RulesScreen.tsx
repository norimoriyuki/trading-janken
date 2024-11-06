import React from "react";

interface RulesScreenProps {
  onBackClick: () => void;
}

const RulesScreen: React.FC<RulesScreenProps> = ({ onBackClick }) => {
  const dummyRules = `Trading Janken:
        ルール
    
    1. じゃんけんベースのゲームです
    　　- あなたが手を選ぶと相手はランダムに手を出します
    2. 出した手は相手が出した手と交換されます
    3. 勝か負けるかすると相手は新しい相手が登場します
    4. グーチョキパーの特殊手もあるので、手に入ったらうまく活用しましょう
    5. 5点のライフがなくなったらゲーム終了、それまでの合計勝ち数で記録を目指してください！
  `;

    const opelation =`
        【PC】
        左クリック：カードを選ぶ
        右クリック：カード詳細を表示
        【スマホ】
        タップ：カードを選ぶ
        長押し：カード詳細を表示

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
      <h1 style={{ marginBottom: "20px" }}>操作</h1>
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
        {opelation}
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
