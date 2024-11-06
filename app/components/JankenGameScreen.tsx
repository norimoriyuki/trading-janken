import ScoreWindow from "./ScoreWindow";
import ResultWindow from "./ResultWindow";
import { useState, useEffect } from "react";
import JankenCard from "./JankenCard";
import { choices, ChoiceType, Choice } from "./choices";


interface JankenGameScreenProps {
  onBackClick: () => void;
  playerChoices: ChoiceType[];
}

function getResult(player: Choice, computer: Choice): "win" | "lose" | "draw" {
  if (player === computer || player === "バリアー" || computer === "バリアー") return "draw";
  if (
    (player === "グー" && computer === "チョキ") ||
    (player === "チョキ" && computer === "パー") ||
    (player === "パー" && computer === "グー")
  ) {
    return "win";
  }
  return "lose";
}

export default function JankenGameScreen({ onBackClick, playerChoices }: JankenGameScreenProps) {
  const [computerChoices, setComputerChoices] = useState<ChoiceType[]>([]);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [playerChoicesState, setPlayerChoicesState] = useState<ChoiceType[]>(playerChoices);
  const [showResult, setShowResult] = useState<{ playerChoice: ChoiceType; computerChoice: ChoiceType; result: string } | null>(null);
  const [showScoreWindow, setShowScoreWindow] = useState<boolean>(false); // スコアウィンドウの表示管理

  const [life, setLife] = useState<number>(2); 
  const [winCount, setWinCount] = useState<number>(0);

  const getRandomChoices = (array: ChoiceType[], count: number): ChoiceType[] => {
    const opponentChoice = array[0]; // 相手の手を配列の最初の要素と仮定
  
    // 配列を複製し、相手の手を複数回追加
    const expandedArray = [...array, opponentChoice, opponentChoice, opponentChoice]; // 必要に応じて重複数を調整
  
    // 配列をシャッフルし、ランダムな要素を選択
    const shuffled = expandedArray.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setComputerChoices(getRandomChoices(choices, 3));
  }, []);

  const handlePlayerChoice = (playerIndex: number) => {
    // ランダムにコンピュータのインデックスを選ぶ
    const randomComputerIndex = Math.floor(Math.random() * computerChoices.length);

    const playerChoice = playerChoicesState[playerIndex];
    const computerChoice = computerChoices[randomComputerIndex];

    // 勝敗判定
    const result = getResult(playerChoice.name, computerChoice.name);

    if (result === "win") {
      setWinCount((prev) => prev + 1);
    } else if (result === "lose") {
      setLife((prev) => prev - 1);
      if (life - 1 <= 0) {
        setShowScoreWindow(true);
      }
    }

    // プレイヤーの手とコンピュータの手を交換する
    const newPlayerChoices = [...playerChoicesState];
    const newComputerChoices = [...computerChoices];
    
    // 交換
    newPlayerChoices[playerIndex] = computerChoice;
    newComputerChoices[randomComputerIndex] = playerChoice;

    setPlayerChoicesState(newPlayerChoices);
    setComputerChoices(newComputerChoices);

    // 勝敗結果をモーダルに表示
    setShowResult({ playerChoice, computerChoice, result });

    if (result !== "draw") {
      const newComputerChoices = getRandomChoices(choices, 3);
      setComputerChoices(newComputerChoices);
    }
  };

  const handleRightClick = (event: React.MouseEvent, description: string) => {
    event.preventDefault();
    setShowDescription(description);
  };

  const closeScoreWindow = () => {
    setShowScoreWindow(false);
    onBackClick(); // ホーム画面に戻る
  };

  const closeDescription = () => setShowDescription(null);
  const closeResult = () => setShowResult(null);

  const handleForfeit = () => {
    setLife(0);
    setShowScoreWindow(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "black",
        color: "white",
        padding: "10px 0",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* 降参ボタンを左端に配置 */}
        <button 
          onClick={handleForfeit} 
          style={{ 
            color: "white", 
            border: "1px solid white",  
            background: "transparent", 
            cursor: "pointer", 
            position: "absolute",
            left: "20px" 
          }}
        >
          降参
        </button>

        {/* タイトルを中央に配置 */}
        <div>Trading Janken</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        {computerChoices.map((choice, index) => (
          <JankenCard
            key={`computer-${index}`}
            choice={choice}
            onClick={() => {}}
            onRightClick={(event) => handleRightClick(event, choice.description)}
          />
        ))}
      </div>

      <h1>相手の手札</h1>

      <h1>あなたの手札</h1>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        {playerChoicesState.map((choice, index) => (
          <JankenCard
            key={`player-${index}`}
            choice={choice}
            onClick={() => handlePlayerChoice(index)}
            onRightClick={(event) => handleRightClick(event, choice.description)}
          />
        ))}
      </div>

      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        backgroundColor: "black",
        color: "white",
        padding: "10px 0",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
      }}>
        <div>残りライフ: {life}</div>
        <div>勝利回数: {winCount}</div>
      </div>

      {showDescription && (
        <div
          onClick={closeDescription}
          style={{
            color:"black",
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
            <p>{showDescription}</p>
          </div>
        </div>
      )}

    <ResultWindow showResult={showResult} closeResult={closeResult} />

    {showScoreWindow && (
      <ScoreWindow
        winCount={winCount}
        closeScoreWindow={closeScoreWindow}
      />
    )}
      

    </div>
  );
}
