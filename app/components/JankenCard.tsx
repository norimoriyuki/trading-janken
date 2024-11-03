import Image from "next/image";

interface JankenCardProps {
  choice: {
    name: string;
    img: string;
    description: string;
  };
  onClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
}

export default function JankenCard({ choice, onClick, onRightClick }: JankenCardProps) {
  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{
        color:"black",
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
      }}
    >
      <Image src={choice.img} alt={choice.name} width={60} height={60} />
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>{choice.name}</p>
    </div>
  );
}
