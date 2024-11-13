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
const adjustColorBrightness = (color: string): string => {
  const brightnessAdjustment = 1;//- level * 0.9; // レベルが高いほど色を暗くする
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
    rock: "rgb(153, 51, 51)", 
    scissors: "rgb(204, 153, 51)", // 赤系
    paper: "rgb(51, 102, 153)", // 青系
    other: "rgb(211, 211, 211)", // グレー系
  }[choice.type] || "rgb(255, 255, 255)";

  // レベルに応じて色を調整
  const borderColor = adjustColorBrightness(baseColor);

  return (
    <div
      className={`${isPlayerHand ? "ripple-container" : ""} ${className}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{
        color: "black",
        margin: "0 10px",
        padding: "10px",
        border: `4px solid ${borderColor}`,//border: "1px solid #ddd",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9", // 固定の背景色
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
      <div
        style={{
          width: "80px",
          height: "80px",
          //borderRadius: "8px", // 角を少し丸める
          //border: `4px solid ${borderColor}`, // 枠の色をタイプに基づいて設定
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={choice.img} alt={choice.name} width={60} height={60} />
      </div>
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>{choice.name}</p>
    </div>
  );
}
