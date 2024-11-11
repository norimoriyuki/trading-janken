"use client"
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleDragStart = (source: string) => {
    setDragSource(source);
  };

  const handleDrop = (target: string) => {
    if (dragSource && target) {
      setDropTarget(target);
      const newLog = `Dragged from ${dragSource} to ${target}`;
      setLogs((prevLogs) => [...prevLogs, newLog]);
    }
  };

  const preventDefault = (e: React.DragEvent) => e.preventDefault();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 上部の1/3 */}
      <div
        style={{ flex: 1, backgroundColor: 'lightcoral' }}
        draggable
        onDragStart={() => handleDragStart("Top")}
        onDrop={() => handleDrop("Top")}
        onDragOver={preventDefault}
      >
        上部
      </div>

      {/* 真ん中の1/3（さらに横に3分割） */}
      <div style={{ flex: 1, display: 'flex' }}>
        <div
          style={{ flex: 1, backgroundColor: 'lightgreen' }}
          draggable
          onDragStart={() => handleDragStart("Middle Left")}
          onDrop={() => handleDrop("Middle Left")}
          onDragOver={preventDefault}
        >
          真ん中左
        </div>
        <div
          style={{ flex: 1, backgroundColor: 'lightyellow' }}
          draggable
          onDragStart={() => handleDragStart("Middle Center")}
          onDrop={() => handleDrop("Middle Center")}
          onDragOver={preventDefault}
        >
          真ん中中央
        </div>
        <div
          style={{ flex: 1, backgroundColor: 'lightpink' }}
          draggable
          onDragStart={() => handleDragStart("Middle Right")}
          onDrop={() => handleDrop("Middle Right")}
          onDragOver={preventDefault}
        >
          真ん中右
        </div>
      </div>

      {/* 下部の1/3 */}
      <div
        style={{ flex: 1, backgroundColor: 'lightgray' }}
        draggable
        onDragStart={() => handleDragStart("Bottom")}
        onDrop={() => handleDrop("Bottom")}
        onDragOver={preventDefault}
      >
        下部
      </div>

      {/* DNDログ表示 */}
      <div style={{ padding: '10px', backgroundColor: 'white', marginTop: 'auto', borderTop: '1px solid #ccc' }}>
        <h4>Drag and Drop Logs</h4>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
