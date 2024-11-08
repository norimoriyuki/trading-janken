// app/debug-card-list/page.tsx
"use client";

import React from "react";
import JankenCard from "../components/JankenCard";
import { choices } from "../components/choices";

export default function DebugCardListPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>card list</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {choices.map((choice, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <JankenCard
              choice={choice}
              onClick={() => {}}
              onRightClick={() => {}}
              isPlayerHand={false} // デバッグ用なので波紋エフェクトはオフ
            />
            <p style={{ margin: "10px 0 0", fontSize: "0.9rem", color: "#333" }}>
              {choice.name} (Type: {choice.type}, Level: {choice.level})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
