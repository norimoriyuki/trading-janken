import ScoreWindow from "./ScoreWindow";
import ResultWindow from "./ResultWindow";
import { useState, useEffect } from "react";
import JankenCard from "./JankenCard";
import { choices, ChoiceType } from "./choices";
import "./JankenGameScreen.css";

interface JankenGameScreenProps {
  onBackClick: () => void;
  playerChoices: ChoiceType[];
}

function getResult(player: ChoiceType, computer: ChoiceType): "win" | "lose" | "draw" {
  if (player.name === computer.name || player.name === "バリアー" || computer.name === "バリアー") return "draw";
  if (
    (player.type === "rock" && computer.type === "scissors") ||
    (player.type === "scissors" && computer.type === "paper") ||
    (player.type === "paper" && computer.type === "rock")
  ) {
    return "win";
  }
  if (player.level > computer.level && player.type === computer.type){
    return "win";
  }
  return "lose";
}

export default function JankenGameScreen({ onBackClick, playerChoices }: JankenGameScreenProps) {
  const [computerChoices, setComputerChoices] = useState<ChoiceType[]>([]);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [playerChoicesState, setPlayerChoicesState] = useState<ChoiceType[]>(playerChoices);
  const [showResult, setShowResult] = useState<{ playerChoice: ChoiceType; computerChoice: ChoiceType; result: string } | null>(null);
  const [showScoreWindow, setShowScoreWindow] = useState<boolean>(false); 

  const [life, setLife] = useState<number>(5); 
  const [winCount, setWinCount] = useState<number>(0);
  const [drawCount, setDrawCount] = useState<number>(0);
  const [animateLife, setAnimateLife] = useState<boolean>(false);

  useEffect(() => {
    // lifeが変わったときにアニメーションを適用
    setAnimateLife(true);
    const timer = setTimeout(() => setAnimateLife(false), 400); // アニメーションが終わったらリセット

    return () => clearTimeout(timer);
  }, [life]);

  const getRandomChoices = (array: ChoiceType[], count: number, winCount: number): ChoiceType[] => {
    // バリアーの重みを計算
    
    
    // グー、チョキ、パーの重みは100に固定
    const otherWeight = 100;
    const midWeight = Math.min(150, Math.max(30 * (winCount-2),0));
    const bigWeight = Math.min(200,Math.max(0, 60 * (winCount-10)));

    const barrierWeight = Math.min(otherWeight, midWeight, bigWeight);
  
    // 重みに基づいて配列を作成
    const weightedArray = [
      ...Array(otherWeight).fill(array.find(choice => choice.name === "グー")),
      ...Array(otherWeight).fill(array.find(choice => choice.name === "チョキ")),
      ...Array(otherWeight).fill(array.find(choice => choice.name === "パー")),
      ...Array(barrierWeight).fill(array.find(choice => choice.name === "バリアー")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "村正")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "隕石")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "エロ本")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "ザリガニ")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "金の玉")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "札"))
    ].filter(Boolean) as ChoiceType[]; // `filter(Boolean)` は null の要素を除去
  
    // 配列をシャッフルし、ランダムな要素を選択
    const shuffled = weightedArray.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setComputerChoices(getRandomChoices(choices, 3, winCount));
  }, []);

  const handlePlayerChoice = (playerIndex: number) => {
    // ランダムにコンピュータのインデックスを選ぶ
    const randomComputerIndex = Math.floor(Math.random() * computerChoices.length);

    const playerChoice = playerChoicesState[playerIndex];
    const computerChoice = computerChoices[randomComputerIndex];

    // 勝敗判定
    const result = getResult(playerChoice, computerChoice);

    if (result === "win") {
      setWinCount((prev) => prev + 1);
      setDrawCount(0); 
    } else if (result === "lose") {
      setLife((prev) => prev - 1);
      setDrawCount(0); 
      if (life - 1 <= 0) {
        setShowScoreWindow(true);
      }
    } else if (result === "draw") {
      setDrawCount((prev) => prev + 1);
      if (drawCount + 1 >= 3) {
        // 3回連続のあいこが発生した場合の処理
        setDrawCount(0);
        setShowResult({ playerChoice, computerChoice, result: "reset" });
        setComputerChoices(getRandomChoices(choices, 3, winCount)); // 相手の手をリセット
        return;
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
      const newComputerChoices = getRandomChoices(choices, 3, winCount);
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
            isPlayerHand={true}
          />
        ))}
      </div>

      <div>
          {Array.from({ length: life }).map((_, index) => (
            <span
              key={index}
              className={`heart ${animateLife ? "heart-animate" : ""}`}
            >
              ❤
            </span>
          ))}
      </div>

      <div>
        <span className="star">★</span> × {winCount}
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

    <ResultWindow showResult={showResult} drawCount = {drawCount} closeResult={closeResult} />

    {showScoreWindow && (
      <ScoreWindow
        winCount={winCount}
        closeScoreWindow={closeScoreWindow}
      />
    )}
      

    </div>
  );
}
