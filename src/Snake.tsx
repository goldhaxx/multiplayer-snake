const Snake = (ctx: CanvasRenderingContext2D, snake: { x: number; y: number }[], gridSize: number) => {
    ctx.fillStyle = '#14F195'; // Snake color
    snake.forEach(part => {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
  };
  
  export default Snake;
  