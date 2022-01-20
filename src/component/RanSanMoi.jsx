import React, { useEffect, useState } from "react";
import "./ransanmoi.css";

let fixDirect = "right";
let fixGameOver = false;
let speed = 150;

const RanSanMoi = () => {
  const getRandomColor = () => {
    let hexa = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)];
    return color;
  };

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [gameLoopTimeout, setGameLoopTimeout] = useState(100);
  const [timeoutId, setTimeoutId] = useState(0);
  const [startSnakeSize, setStartSnakeSize] = useState(0);
  const [snake, setSnake] = useState([]);
  const [apple, setApple] = useState([]);
  const [direction, setDirection] = useState("right");
  const [directionChanged, setDirectionChanged] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [snakeColor, setSnakeColor] = useState(getRandomColor());
  const [appleColor, setAppleColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(0);

  const handleKeyDown = (event) => {
    // console.log(event.keyCode);

    // // if spacebar is pressed to run a new game
    // if (fixGameOver && event.keyCode === 32) {
    //   resetGame();
    //   return;
    // }

    if (directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        goLeft();
        break;
      case 38:
      case 87:
        goUp();
        break;
      case 39:
      case 68:
        goRight();
        break;
      case 40:
      case 83:
        goDown();
        break;
      default:
    }
    setDirectionChanged(true);
  };

  const handleButton = (button) => {
    switch (button) {
      case "A":
        goLeft();
        break;
      case "W":
        goUp();
        break;
      case "D":
        goRight();
        break;
      case "S":
        goDown();
        break;
      default:
    }
    setDirectionChanged(true);
  };

  useEffect(async () => {
    initGame();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (snake.length !== 0) gameLoop();
  }, [startGame]);

  useEffect(() => {
    if (score > 40) speed = 35;
    else if (score > 30) speed = 50;
    else if (score > 15) speed = 70;
    else if (score > 5) speed = 100;
  }, [score]);


  const initGame = () => {
    // Game size initialization
    let percentageWidth = 40;
    let width =
      document.getElementById("GameBoard").parentElement.offsetWidth *
      (percentageWidth / 100);
    width -= width % 30;
    if (width < 300) width = 300;
    // width = 350;
    let height = (width / 3) * 2;

    let blockWidth = width / 30;
    let blockHeight = height / 20;

    // snake initialization
    let startSnakeSize = 6;
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }

    // apple position initialization
    let appleXpos =
      Math.floor(Math.random() * ((width - 2 * blockWidth) / blockWidth + 1)) *
      blockWidth;
    let appleYpos =
      Math.floor(
        Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
      ) * blockHeight;
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(
          Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
        ) * blockHeight;
    }

    setWidth(width);
    setHeight(height);
    setBlockWidth(blockWidth);
    setBlockHeight(blockHeight);
    setStartSnakeSize(startSnakeSize);
    setSnake(snake);
    setApple({ Xpos: appleXpos, Ypos: appleYpos });
    setStartGame(startGame + 1);
    speed = 150;
  };

  const gameLoop = () => {
    let timeoutId = setTimeout(() => {
      if (fixGameOver === false && snake.length !== 0) {
        moveSnake();
        tryToEatSnake();
        tryToEatApple();
        setDirectionChanged(false);
        gameLoop();
      } else {
        // console.log("----GAME IS OVER----");
      }
    }, speed);
    setTimeoutId(timeoutId);
  };

  const resetGame = () => {
    // let width = width;
    // let height = height;
    // let blockWidth = blockWidth;
    // let blockHeight = blockHeight;
    let apple1 = apple;

    // snake reset
    let snake1 = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake1.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake1.push(snakePart);
    }

    // apple position reset
    apple1.Xpos =
      Math.floor(Math.random() * ((width - 2 * blockWidth) / blockWidth + 1)) *
      blockWidth;
    apple1.Ypos =
      Math.floor(
        Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
      ) * blockHeight;
    while (isAppleOnSnake(apple1.Xpos, apple1.Ypos)) {
      apple1.Xpos =
        Math.floor(
          Math.random() * ((width - 2 * blockWidth) / blockWidth + 1)
        ) * blockWidth;
      apple1.Ypos =
        Math.floor(
          Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
        ) * blockHeight;
    }

    setSnake(snake1);
    setApple(apple1);
    setDirection("right");
    fixDirect = "right";
    fixGameOver = false;
    speed = 150;
    setDirectionChanged(false);
    setIsGameOver(false);
    setGameLoopTimeout(50);
    setSnakeColor(getRandomColor());
    setAppleColor(getRandomColor());
    setScore(0);
    setStartGame(startGame + 1);
  };

  const moveSnake = () => {
    let snake1 = snake;

    if (snake.length === 0) return;
    let previousPartX = snake[0].Xpos;
    let previousPartY = snake[0].Ypos;
    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;
    moveHead();
    for (let i = 1; i < snake1.length; i++) {
      tmpPartX = snake1[i].Xpos;
      tmpPartY = snake1[i].Ypos;
      snake1[i].Xpos = previousPartX;
      snake1[i].Ypos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }
    setSnake(snake1);
  };

  const tryToEatApple = () => {
    let snake1 = snake;
    let apple1 = apple;

    // if the snake's head is on an apple
    if (snake1[0].Xpos === apple1.Xpos && snake1[0].Ypos === apple1.Ypos) {
      console.log("EATING APPLE! !!!!");
      // let width = width;
      // let height = height;
      // let blockWidth = blockWidth;
      // let blockHeight = blockHeight;
      let newTail = { Xpos: apple1.Xpos, Ypos: apple1.Ypos };
      // let gameLoopTimeout = gameLoopTimeout;

      // increase snake size
      snake1.push(newTail);

      // create another apple
      apple1.Xpos =
        Math.floor(
          Math.random() * ((width - 2 * blockWidth) / blockWidth + 1)
        ) * blockWidth;
      apple1.Ypos =
        Math.floor(
          Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
        ) * blockHeight;
      while (isAppleOnSnake(apple1.Xpos, apple1.Ypos)) {
        apple1.Xpos =
          Math.floor(
            Math.random() * ((width - 2 * blockWidth) / blockWidth + 1)
          ) * blockWidth;
        apple1.Ypos =
          Math.floor(
            Math.random() * ((height - 2 * blockHeight) / blockHeight + 1)
          ) * blockHeight;
      }

      // decrease the game loop timeout
      // if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5;

      setSnake(snake1);
      setApple(apple1);
      setScore((prev) => prev + 1);
      // setGameLoopTimeout(gameLoopTimeout);
    }
  };

  const tryToEatSnake = () => {
    let snake1 = snake;
    if (snake.length === 0) return;

    for (let i = 1; i < snake1.length; i++) {
      if (
        snake1[0].Xpos === snake1[i].Xpos &&
        snake1[0].Ypos === snake1[i].Ypos
      ) {
        setIsGameOver(true);
        fixGameOver = true;
      }
    }
  };

  const isAppleOnSnake = (appleXpos, appleYpos) => {
    // let snake1 = snake;
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true;
    }
    return false;
  };

  const moveHead = () => {
    switch (fixDirect) {
      case "left":
        moveHeadLeft();
        break;
      case "up":
        moveHeadUp();
        break;
      case "right":
        moveHeadRight();
        break;
      default:
        moveHeadDown();
    }
  };

  const moveHeadLeft = () => {
    // let width = width;
    // let blockWidth = blockWidth;
    let snake1 = snake;
    snake1[0].Xpos =
      snake[0].Xpos <= 0 ? width - 2 * blockWidth : snake[0].Xpos - blockWidth;
    setSnake(snake1);
  };

  const moveHeadUp = () => {
    // let height = height;
    // let blockHeight = blockHeight;
    let snake1 = snake;
    snake1[0].Ypos =
      snake[0].Ypos <= 0
        ? height - 2 * blockHeight
        : snake[0].Ypos - blockHeight;
    setSnake(snake1);
  };

  const moveHeadRight = () => {

    let width1 = width;
    let blockWidth1 = blockWidth;
    let snake1 = snake;
    snake1[0].Xpos =
      snake1[0].Xpos >= width1 - 2 * blockWidth1
        ? 0
        : snake1[0].Xpos + blockWidth1;
    setSnake(snake1);
  };

  const moveHeadDown = () => {
    // let height1 = height;
    // let blockHeight1 = blockHeight;
    let snake1 = snake;
    snake1[0].Ypos =
      snake1[0].Ypos >= height - 2 * blockHeight
        ? 0
        : snake[0].Ypos + blockHeight;
    setSnake(snake);
  };

  const goLeft = () => {
    let newDirection = direction === "right" ? "right" : "left";
    setDirection(newDirection);
    fixDirect = fixDirect === "right" ? "right" : "left";
  };

  const goUp = () => {
    let newDirection = direction === "down" ? "down" : "up";
    fixDirect = fixDirect === "down" ? "down" : "up";

    setDirection(newDirection);
  };

  const goRight = () => {
    let newDirection = direction === "left" ? "left" : "right";
    fixDirect = fixDirect === "left" ? "left" : "right";

    setDirection(newDirection);
  };

  const goDown = () => {
    let newDirection = direction === "up" ? "up" : "down";
    fixDirect = fixDirect === "up" ? "up" : "down";
    setDirection(newDirection);
  };

  return (
    <div>
      {fixGameOver == true ? (
        <div>
          <h1> End Game</h1>
          <p>SCORE: {score}</p>
          <div className="btn btn-primary" onClick={() => resetGame()}>
            Play again
          </div>
        </div>
      ) : (
        <div
          id="GameBoard"
          style={{
            width: width,
            height: height,
            borderWidth: width / 50,
          }}
          className={"level-" + speed}
        >
          {snake.map((snakePart, index) => {
            if (index === 0)
              return (
                <div
                  key={index}
                  className="Block rounded-circle border border-danger border-2"
                  style={{
                    width: blockWidth,
                    height: blockHeight,
                    left: snakePart.Xpos,
                    top: snakePart.Ypos,
                    background: snakeColor,
                  }}
                ></div>
              );
            else
              return (
                <div
                  key={index}
                  className="Block border border-danger border-2"
                  style={{
                    width: blockWidth,
                    height: blockHeight,
                    left: snakePart.Xpos,
                    top: snakePart.Ypos,
                    background: snakeColor,
                  }}
                ></div>
              );
          })}
          <div
            className="Block border border-danger border-2"
            style={{
              width: blockWidth,
              height: blockHeight,
              left: apple.Xpos,
              top: apple.Ypos,
              background: appleColor,
            }}
          />
          <div id="Score" style={{ fontSize: width / 20 }}>
            SCORE: {score}
          </div>
          {/* <p>Speed: {speed} {width}</p> */}
        </div>
      )}
      <div className="row mt-5">
        <div className="col-12">
          <div
            className="buttonSnake btn btn-outline-warning m-1 ps-5 pe-5 pt-3 pb-3"
            onClick={() => handleButton("W")}
          >
            W
          </div>
        </div>
        <div className="col-6 ">
          <div
            className="buttonSnake btn btn-outline-warning m-2 ps-5 pe-5 pt-3 pb-3"
            onClick={() => handleButton("A")}
          >
            A
          </div>
        </div>
        <div className="col-6 ">
          <div
            className="buttonSnake btn btn-outline-warning m-2 ps-5 pe-5 pt-3 pb-3"
            onClick={() => handleButton("D")}
          >
            D
          </div>
        </div>
        <div className="col-12 ">
          <div
            className="buttonSnake btn btn-outline-warning m-1 ps-5 pe-5 pt-3 pb-3"
            onClick={() => handleButton("S")}
          >
            S
          </div>
        </div>
      </div>
    </div>
  );
};
export default RanSanMoi;
