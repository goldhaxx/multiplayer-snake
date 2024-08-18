import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { generateFood, initializeSnake } from './utils';
import Snake from './Snake';
import Food from './Food';

const gridSize = 20;
const canvasSize = 500;
const tileCount = canvasSize / gridSize;

const App: React.FC = () => {
  const [snake, setSnake] = useState(initializeSnake());
  const [food, setFood] = useState(generateFood(tileCount));
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
        setFood(generateFood(tileCount));
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

    // Render snake and food
    Snake(ctx, snake, gridSize);
    Food(ctx, food, gridSize);
  }, [snake, food]);

  return (
    <div className="App">
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
    </div>
  );
};

export default App;
