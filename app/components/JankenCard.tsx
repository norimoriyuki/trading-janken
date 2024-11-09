import Image from "next/image";
import "./JankenCard.css";

interface JankenCardProps {
  choice: {
    name: string;
    img: string;
    description: string;
    type: string;
    level: number;
  };
  onClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
  isPlayerHand?: boolean;
  className?: string; // classNameを追加
}

// レベルに応じて明度を調整する関数
const adjustColorBrightness = (color: string, level: number): string => {
  const brightnessAdjustment = 1 - level * 0.09; // レベルが高いほど色を暗くする
  const [r, g, b] = color.match(/\d+/g)!.map(Number);
  return `rgb(${Math.floor(r * brightnessAdjustment)}, ${Math.floor(g * brightnessAdjustment)}, ${Math.floor(b * brightnessAdjustment)})`;
};

export default function JankenCard({
  choice,
  onClick,
  onRightClick,
  isPlayerHand = false,
  className = "", // デフォルト値を設定
}: JankenCardProps) {
  // タイプに基づいた基本色
  const baseColor = {
    rock: "rgb(173, 216, 230)", // 青系
    scissors: "rgb(255, 182, 193)", // 赤系
    paper: "rgb(144, 238, 144)", // 緑系
    other: "rgb(211, 211, 211)", // グレー系
  }[choice.type] || "rgb(255, 255, 255)";

  // レベルに応じて色を調整
  const backgroundColor = adjustColorBrightness(baseColor, choice.level);

  return (
    <div
      className={`${isPlayerHand ? "ripple-container" : ""} ${className}`} // 動的なクラス名
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{
        color: "black",
        margin: "0 10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        backgroundColor: backgroundColor,
        cursor: "pointer",
        width: "80px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image src={choice.img} alt={choice.name} width={60} height={60} />
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>{choice.name}</p>
    </div>
  );
}