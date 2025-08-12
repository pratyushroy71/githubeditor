import React, { useEffect, useState } from 'react';

const MatrixRain: React.FC = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number; char: string }>>([]);

  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      char: characters[Math.floor(Math.random() * characters.length)]
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="matrix-rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-char"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
