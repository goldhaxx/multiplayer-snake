export const generateFood = (tileCount: number) => {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  };
  
  export const initializeSnake = () => {
    return [{ x: 10, y: 10 }];
  };
  