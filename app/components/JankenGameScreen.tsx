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
  //const [computerChoiceIndex, setComputerChoiceIndex] = useState<number>(0);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [playerChoicesState, setPlayerChoicesState] = useState<ChoiceType[]>(playerChoices);
  const [showResult, setShowResult] = useState<{ playerChoice: ChoiceType; computerChoice: ChoiceType; result: string } | null>(null);
  const [showScoreWindow, setShowScoreWindow] = useState<boolean>(false); // スコアウィンドウの表示管理
  const [playerName, setPlayerName] = useState<string>("");

  const [life, setLife] = useState<number>(5); 
  const [winCount, setWinCount] = useState<number>(0);

  const getRandomChoices = (array: ChoiceType[], count: number): ChoiceType[] => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setComputerChoices(getRandomChoices(choices, 3));
  }, []);

  const handlePlayerChoice = (playerIndex: number) => {
    // ランダムにコンピュータのインデックスを選ぶ
    const randomComputerIndex = Math.floor(Math.random() * computerChoices.length);
    //setComputerChoiceIndex(randomComputerIndex);

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

  const handleSubmitScore = () => {
    // スコア送信処理（今は何もしない）
  };

  const closeScoreWindow = () => {
    setShowScoreWindow(false);
    onBackClick(); // ホーム画面に戻る
  };

  const closeDescription = () => setShowDescription(null);
  const closeResult = () => setShowResult(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>相手の手札</h1>

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
        //maxWidth: "500px",  // 親コンテナに合わせる
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

      {showResult && (
        <div
          onClick={closeResult}
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
          <h2>対戦結果</h2>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", margin: "20px 0" }}>
              {/* プレイヤーの手 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>自分の手</h3>
                <JankenCard choice={showResult.playerChoice} onClick={() => {}} onRightClick={() => {}} />
              </div>

              {/* 相手の手 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>相手の手</h3>
                <JankenCard choice={showResult.computerChoice} onClick={() => {}} onRightClick={() => {}} />
              </div>
            </div>

            <p>結果: {showResult.result === "win" ? "勝ち" : showResult.result === "lose" ? "負け" : "あいこ"}</p>
          </div>
        </div>
      )}

{showScoreWindow && (
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
                送信
              </button>
              <button onClick={closeScoreWindow} style={{ padding: "10px 20px" }}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      

    </div>
  );
}
