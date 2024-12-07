import ScoreWindow from "./ScoreWindow";
import ResultWindow from "./ResultWindow";
import { useState, useEffect } from "react";
import JankenCard from "./JankenCard";
import { choices, ChoiceType } from "./choices";
import "./JankenGameScreen.css";
import Image from "next/image";

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
  if (player.level > computer.level && player.type === computer.type) {
    return "win";
  }
  return "lose";
}

const enemyImages = [
  "/robot1_blue.png",
  "/robot2_green.png",
  "/robot3.png",
  "/robot4_orange.png",
  "/robot5_red.png",
  "/robot6_purple.png"
];

export default function JankenGameScreen({ onBackClick, playerChoices }: JankenGameScreenProps) {
  const [computerChoices, setComputerChoices] = useState<ChoiceType[]>([]);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [playerChoicesState, setPlayerChoicesState] = useState<ChoiceType[]>(playerChoices);
  const [showResult, setShowResult] = useState<{ playerChoice: ChoiceType; computerChoice: ChoiceType; result: string } | null>(null);
  const [showScoreWindow, setShowScoreWindow] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const [life, setLife] = useState<number>(5);
  const [winCount, setWinCount] = useState<number>(0);
  const [drawCount, setDrawCount] = useState<number>(0);
  const [animateLife, setAnimateLife] = useState<boolean>(false);
  const [slidingInIndex, setSlidingInIndex] = useState<number | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [enemyImage, setEnemyImage] = useState<string>(enemyImages[0]);
  const [isEnemyImageAnimating, setIsEnemyImageAnimating] = useState(false);

  useEffect(() => {
    setAnimateLife(true);
    const timer = setTimeout(() => setAnimateLife(false), 400);
    return () => clearTimeout(timer);
  }, [life]);

  const getRandomChoices = (array: ChoiceType[], count: number, winCount: number): ChoiceType[] => {
    const otherWeight = 100;
    const midWeight = Math.min(150, Math.max(30 * (winCount - 2), 0));
    const bigWeight = Math.min(200, Math.max(0, 60 * (winCount - 10)));
    const barrierWeight = Math.max(15, Math.min(otherWeight, midWeight, bigWeight));

    const weightedArray = [
      ...Array(otherWeight).fill(array.find(choice => choice.name === "グー")),
      ...Array(otherWeight).fill(array.find(choice => choice.name === "チョキ")),
      ...Array(otherWeight).fill(array.find(choice => choice.name === "パー")),
      ...Array(barrierWeight).fill(array.find(choice => choice.name === "バリアー")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "村正")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "隕石")),
      ...Array(bigWeight).fill(array.find(choice => choice.name === "愛")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "ザリガニ")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "金の玉")),
      ...Array(midWeight).fill(array.find(choice => choice.name === "札"))
    ].filter(Boolean) as ChoiceType[];

    const shuffled = weightedArray.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const getRandomEnemyImage = () => {
    const randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];
    setEnemyImage(randomImage);
  };

  useEffect(() => {
    if (computerChoices.length === 0) {
      setComputerChoices(getRandomChoices(choices, 3, winCount));
    }
  }, [computerChoices, winCount]);

  const handlePlayerChoice = (playerIndex: number) => {
    const randomComputerIndex = Math.floor(Math.random() * computerChoices.length);

    const playerChoice = playerChoicesState[playerIndex];
    const computerChoice = computerChoices[randomComputerIndex];

    const result = getResult(playerChoice, computerChoice);

    const newPlayerChoices = [...playerChoicesState];
    const newComputerChoices = [...computerChoices];

    newPlayerChoices[playerIndex] = computerChoice;
    newComputerChoices[randomComputerIndex] = playerChoice;

    setPlayerChoicesState(newPlayerChoices);
    setComputerChoices(newComputerChoices);

    setSelectedCardIndex(playerIndex);

    if (result === "win") {
      setWinCount((prev) => prev + 1);
      setDrawCount(0);
    } else if (result === "lose") {
      setLife((prev) => prev - 1);
      setDrawCount(0);
    } else if (result === "draw") {
      setDrawCount((prev) => prev + 1);
      if (drawCount + 1 >= 3) {
        setWinCount((prev) => prev + 1);
        setDrawCount(0);
        setShowResult({ playerChoice, computerChoice, result: "reset" });
        return;
      }
    }

    setShowResult({ playerChoice, computerChoice, result });

    if (result !== "draw") {
      setIsShuffling(true);
      setIsShuffling(false);
    }
  };

  const handleRightClick = (event: React.MouseEvent, description: string) => {
    event.preventDefault();
    setShowDescription(description);
  };

  const closeScoreWindow = () => {
    setShowScoreWindow(false);
    onBackClick();
  };

  const closeDescription = () => setShowDescription(null);

  const closeResult = () => {
    setShowResult(null);
    if (selectedCardIndex !== null) {
      setSlidingInIndex(selectedCardIndex);
      setTimeout(() => setSlidingInIndex(null), 600);
      setSelectedCardIndex(null);
    }

    if (drawCount === 0) {
      getRandomEnemyImage();
      setIsEnemyImageAnimating(true);
      setIsShuffling(true);
      setTimeout(() => {
        setComputerChoices(getRandomChoices(choices, 3, winCount));
        setTimeout(() => setIsShuffling(false), 600);
        setTimeout(() => setIsEnemyImageAnimating(false), 600);
      }, 100);
    }

    if (life <= 0) {
      setTimeout(() => setShowScoreWindow(true), 100);
    }

    if (slidingInIndex !== null) {
      setTimeout(() => setSlidingInIndex(null), 600);
    }
  };

  const handleForfeit = () => {
    setLife(0);
    setShowScoreWindow(true);
  };

  return (
    // 親要素：ここを基準として%指定を行う
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative"
    }}>
      <div style={{
        //position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "black",
        color: "white",
        padding: "1% 0",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <button
          onClick={handleForfeit}
          style={{
            color: "white",
            border: "0.2% solid white",
            background: "transparent",
            cursor: "pointer",
            position: "absolute",
            left: "4%" //20px相当を約4%とする（画面幅に応じて調整）
          }}
        >
          降参
        </button>
        <div>Trading Janken</div>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        // 3.75rem ≈ 60px相当を約12%とする
        transform: "translateX(20%)"
      }}>
        <div
          className={`${isEnemyImageAnimating ? "fade-in-blur" : ""}`}
          style={{
            borderRight: "none",
            padding: "1% 2%",
            // -30px→約-6%
            marginRight: "-6%",
            // 10px→約2%
            marginLeft: "2%",
            color: "black",
            width: "20vh",
            textAlign: "left",
            background: `linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 30%)`,
          }}
        >
          {/* 2.5rem(約40px)→約8% margin-bottom, 10px→2% margin-left */}
          <p style={{ fontWeight: "bold", marginBottom: "8%", marginLeft: "2%" }}>ランダムロボ</p>
        </div>
        <div style={{ 
          position: "relative", 
          width: "15vh", 
          height: "15vh"
        }}>
          <Image 
            src={enemyImage} 
            alt="Computer" 
            fill 
            style={{ objectFit: "contain", zIndex: 1 }} 
          />
        </div>
      </div>

      <div className="computer-card-container"
        style={{
          // 1.25rem≈20px→4%, 2.5rem≈40px→8%
          marginTop: "4%",
          marginBottom:"8%"
        }}
      >
        {computerChoices.map((choice, index) => (
          <div key={index} className={isShuffling ? "computer-card" : ""}>
            <JankenCard
              choice={choice}
              onClick={() => {}}
              onRightClick={(event) => handleRightClick(event, choice.description)}
            />
          </div>
        ))}
      </div>

      <div className="player-card-container" style={{ width: "100%" }}>
        {playerChoicesState.map((choice, index) => (
          <JankenCard
            key={`player-${index}`}
            choice={choice}
            onClick={() => handlePlayerChoice(index)}
            onRightClick={(event) => handleRightClick(event, choice.description)}
            isPlayerHand={true}
            className={slidingInIndex === index ? "card-slide-in" : ""}
          />
        ))}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        // -10px→約-2%
        transform: "translateX(-5rem)"
      }}>
        <div style={{ 
          position: "relative", 
          width: "20vh", 
          height: "15vh" // ここで明確な高さを指定する
        }}>
          <Image src={"/player.png"} alt="player" fill style={{objectFit: "contain", zIndex: 1 }} />
        </div>
        <div style={{
          borderLeft: "none",
          paddingLeft: "3rem",
          marginLeft: "-2rem",
          color: "black",
          width: "10rem",
          textAlign: "left",
          background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255,0.5) 30%)`,
        }}>
          <p style={{ fontWeight: "bold" }}>You</p>
          <div style={{margin:"-1%"}}>
            {Array.from({ length: life }).map((_, index) => (
              <span
                key={index}
                className={`heart ${animateLife ? "heart-animate" : ""}`}
              >
                ❤
              </span>
            ))}
          </div>

          <div style={{margin:"-1%"}}>
            <span className="star">★</span> × {winCount}
          </div>
        </div>
      </div>

      <h5>カードを確認：右クリック（PC）、長押し（スマホ）</h5>

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
              //20px→約4%
              padding: "4%",
              //10px→約2%
              borderRadius: "2%",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            <p>{showDescription}</p>
          </div>
        </div>
      )}

      <ResultWindow showResult={showResult} drawCount={drawCount} closeResult={closeResult} />

      {showScoreWindow && (
        <ScoreWindow
          winCount={winCount}
          closeScoreWindow={closeScoreWindow}
        />
      )}
    </div>
  );
}
