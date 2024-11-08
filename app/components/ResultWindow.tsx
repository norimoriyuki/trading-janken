import React from "react";
import JankenCard from "./JankenCard";
import "./ResultWindow.css";
import { ChoiceType } from "./choices";

interface ResultWindowProps {
  showResult: {
    playerChoice: ChoiceType;
    computerChoice: ChoiceType;
    result: string;
  } | null;
  drawCount: number;
  closeResult: () => void;
}

const ResultWindow: React.FC<ResultWindowProps> = ({ showResult, drawCount, closeResult }) => {
  if (!showResult) return null;

  const backgroundColor = showResult.result === "win" ? "lightgreen" : showResult.result === "lose" ? "#ccc" : "white";

  return (
    <div className="overlay" onClick={closeResult}>
      <div className="result-window" style={{ backgroundColor }}>
        <div className="result-container">

          {/* 相手の手 */}
          <div className="choice choice-computer">
            <h3>Enemy</h3>
            <JankenCard choice={showResult.computerChoice} onClick={() => {}} onRightClick={() => {}} />
          </div>
        </div>

        <p className="result-text">
          {showResult.result === "win" ? "WIN" : showResult.result === "lose" ? "LOSE" :`あいこ${drawCount > 0 ? `（${drawCount}/3）` : "3/3"}`}
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
