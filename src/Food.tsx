const Food = (ctx: CanvasRenderingContext2D, food: { x: number; y: number }, gridSize: number) => {
    ctx.fillStyle = '#9945FF'; // Food color
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  };
  
  export default Food;
  