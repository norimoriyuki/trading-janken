import Image from "next/image";
import "./JankenCard.css"; // CSSファイルをインポートして、波紋エフェクトを適用

interface JankenCardProps {
  choice: {
    name: string;
    img: string;
    description: string;
  };
  onClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
  isPlayerHand?: boolean; // 自分の手札にあるかどうかを示す新しいプロパティ（デフォルト: false）
}

export default function JankenCard({ choice, onClick, onRightClick, isPlayerHand = false }: JankenCardProps) {
  return (
    <div
      className={isPlayerHand ? "ripple-container" : ""} // 自分の手札のときだけ波紋エフェクトを適用
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{
        color: "black",
        margin: "0 10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
        width: "80px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        position: "relative", // 波紋エフェクトに必要なスタイル
        overflow: "hidden",
      }}
    >
      <Image src={choice.img} alt={choice.name} width={60} height={60} />
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>{choice.name}</p>
    </div>
  );
}
