interface HomeScreenProps {
    onStartClick: () => void;
    results: { win: number; lose: number; draw: number };
  }
  
  export default function HomeScreen({ onStartClick, results }: HomeScreenProps) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>じゃんけんゲーム</h1>
        <p>勝ち: {results.win} 回</p>
        <p>負け: {results.lose} 回</p>
        <p>あいこ: {results.draw} 回</p>
        <button onClick={onStartClick} style={{ marginTop: "20px", padding: "10px 20px" }}>
          スタート
        </button>
      </div>
    );
  }
  