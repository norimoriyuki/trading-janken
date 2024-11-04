import React from "react";
import JankenCard from "./JankenCard";
import "./ResultWindow.css";

interface ChoiceType {
  name: string;
  img: string;
  description: string;
}

interface ResultWindowProps {
  showResult: {
    playerChoice: ChoiceType;
    computerChoice: ChoiceType;
    result: string;
  } | null;
  closeResult: () => void;
}

const ResultWindow: React.FC<ResultWindowProps> = ({ showResult, closeResult }) => {
  if (!showResult) return null;

  return (
    <div className="overlay" onClick={closeResult}>
      <div className="result-window">
        <div className="result-container">

          {/* 相手の手 */}
          <div className="choice choice-computer">
            <h3>Enemy</h3>
            <JankenCard choice={showResult.computerChoice} onClick={() => {}} onRightClick={() => {}} />
          </div>
        </div>

        <p className="result-text">
          {showResult.result === "win" ? "勝ち" : showResult.result === "lose" ? "負け" : "あいこ"}
        </p>

        <div className="choice choice-player">
            <h3>You</h3>
            <JankenCard choice={showResult.playerChoice} onClick={() => {}} onRightClick={() => {}} />
        </div>


      </div>
    </div>
  );
};

export default ResultWindow;
