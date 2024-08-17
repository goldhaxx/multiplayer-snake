import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const gridSize = 20;
const canvasSize = 500;
const tileCount = canvasSize / gridSize;

interface SnakePart {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [snake, setSnake] = useState<SnakePart[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'w':
        if (velocity.y === 0) setVelocity({ x: 0, y: -1 });
        break;
      case 's':
        if (velocity.y === 0) setVelocity({ x: 0, y: 1 });
        break;
      case 'a':
        if (velocity.x === 0) setVelocity({ x: -1, y: 0 });
        break;
      case 'd':
        if (velocity.x === 0) setVelocity({ x: 1, y: 0 });
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [velocity]);

  useEffect(() => {
    const gameLoop = () => {
      const newSnake = [...snake];
      const newHead = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
      newSnake.unshift(newHead);

      // Check for collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({ x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) });
      } else {
        newSnake.pop();
      }

      // Wrap around edges
      newHead.x = (newHead.x + tileCount) % tileCount;
      newHead.y = (newHead.y + tileCount) % tileCount;

      setSnake(newSnake);
    };

    const interval = setInterval(gameLoop, 100);
    return () => clearInterval(interval);
  }, [snake, velocity, food]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }, [snake, food]);

  return (
    <div className="App">
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
    </div>
  );
};

export default App;
