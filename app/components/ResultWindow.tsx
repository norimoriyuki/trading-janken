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

  const backgroundColor = "#d3d3d3";

  return (
    <div className="overlay" onClick={closeResult}>
      <div className="result-window" style={{ backgroundColor }}>
        <div className="result-container">

          {/* 相手の手 */}
          <div className="choice choice-computer">
            <JankenCard choice={showResult.computerChoice} onClick={() => {}} onRightClick={() => {}} />
          </div>
        </div>

        <p className="result-text">
          {showResult.result === "win" ? "WIN" : showResult.result === "lose" ? "LOSE" :`あいこ${drawCount > 0 ? `（${drawCount}/3）` : "3/3"}`}
        </p>

        <div className="result-icon">
          {showResult.result === "win" && (
            <span className="star-icon">
              ★<span className="plus-minus">+1</span>
            </span>
          )}
          {showResult.result === "lose" && (
            <span className="heart-icon">
              ❤<span className="plus-minus">-1</span>
            </span>
          )}
        </div>

        <div className="choice choice-player">
            <JankenCard choice={showResult.playerChoice} onClick={() => {}} onRightClick={() => {}} />
        </div>


      </div>
    </div>
  );
};

export default ResultWindow;
