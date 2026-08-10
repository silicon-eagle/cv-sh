"use client";

import {useState, useEffect} from "react";
import { randomInt } from "@/lib/utils";
import styles from "./snake.module.css";

const GRID_SIZE_X = 30;
const GRID_SIZE_Y = 20;
const CELL_COUNT = GRID_SIZE_X * GRID_SIZE_Y;
const TICK_RATE = 120;

type Position = {
  x: number;
  y: number;
};

type Direction =
  | "up"
  | "down"
  | "left"
  | "right";


type GameState = {
  snake: Position[];
  currentDirection: Direction;
  nextDirection: Direction;
  food: Position;
  score: number;
  gameOver: boolean;
};

const cellIndices = Array.from(
  { length: CELL_COUNT },
  (_, index) => index,
);

const DIRECTION_VECTOR: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_DIRECTION: Partial<Record<string, Direction>> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

const INITIAL_DIRECTION: Direction = "right";
const INITIAL_POSITION: Position[] = [
  { x: 3, y: 2 },
  { x: 2, y: 2 },
  { x: 1, y: 2 },
];

const INITIAL_FOOD: Position = {x: Math.floor(GRID_SIZE_X / 2), y: Math.floor(GRID_SIZE_Y / 2)}

function isOppositeDirection(
  current: Direction,
  next: Direction,
): boolean {
  return (
    (current === "up" && next === "down") ||
    (current === "down" && next === "up") ||
    (current === "left" && next === "right") ||
    (current === "right" && next === "left")
  );
}

function indexToPosition(index: number): Position {
  return {
    x: index % GRID_SIZE_X,
    y: Math.floor(index / GRID_SIZE_X),
  };
}

function positionToIndex(position: Position): number {
  return position.y * GRID_SIZE_X + position.x;
}

function isSamePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

function isSnakeCell(
  position: Position,
  snake: Position[],
): boolean {
  return snake.some(segment =>
    isSamePosition(segment, position)
  );
}

function renderCell(
  index: number,
  game: GameState,
) {
  const position = indexToPosition(index);
  const isSnake = isSnakeCell(position, game.snake);
  const isFood = isSamePosition(position, game.food)

  const className = [
    styles.cell,
    isSnake ? styles.snake : "",
    isFood ? styles.food : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      key={index}
      className={className}
    />
  );
}

function getNextHead(
  head: Position,
  direction: Direction,
): Position {
  const vector = DIRECTION_VECTOR[direction];
  const newX =
    (head.x + vector.x + GRID_SIZE_X) % GRID_SIZE_X;

  const newY =
    (head.y + vector.y + GRID_SIZE_Y) % GRID_SIZE_Y;

  return {
    x: newX, 
    y: newY
  };


}

function isSelfCollision(
  head: Position,
  body: Position[],
): boolean {
  return body.some(segment =>
    isSamePosition(segment, head)
  );
}

function createFood(
  snake: Position[]
): Position {
  const occupiedIndices = new Set(
    snake.map(positionToIndex),
  );

  const freeIndices = cellIndices.filter(
    index => !occupiedIndices.has(index)
  );

  const randomIndex = freeIndices[
    Math.floor(Math.random() * freeIndices.length)
  ];

  return indexToPosition(randomIndex);
}

function createInitialGameState(): GameState {
  const snake = [...INITIAL_POSITION];

  return {
    snake,
    currentDirection: INITIAL_DIRECTION,
    nextDirection: INITIAL_DIRECTION,
    food: INITIAL_FOOD,
    score: 0,
    gameOver: false,
  };
}


function advanceGame(
  game: GameState,
): GameState {
  if (game.gameOver) {
    return game;
  }

  const head = game.snake[0];

  const newHead = getNextHead(
    head,
    game.nextDirection,
  );

  const ateFood = isSamePosition(
    newHead,
    game.food,
  );

  const collisionBody = ateFood
    ? game.snake
    : game.snake.slice(0, -1);

  if (
    isSelfCollision(
      newHead,
      collisionBody,
    )
  ) {
    return {
      ...game,
      gameOver: true,
    };
  }

  const newSnake = ateFood
    ? [newHead, ...game.snake]
    : [newHead, ...game.snake.slice(0, -1)];

  return {
    ...game,
    snake: newSnake,
    currentDirection: game.nextDirection,
    food: ateFood
      ? createFood(newSnake)
      : game.food,
    score: ateFood
      ? game.score + 1
      : game.score,
  };
}

export default function Snake() {
  // initialization

  const [game, setGame] = useState<GameState>(createInitialGameState);

  // timer
  useEffect(() => {
    if (game.gameOver) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setGame(currentGame =>
        advanceGame(currentGame)
      );
    }, TICK_RATE);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [game.gameOver]);

  // keyboard interaction
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const requestedDirection = KEY_DIRECTION[event.key];

      if (!requestedDirection) {
        return;
      }

      event.preventDefault();

      setGame(currentGame => {
        // A direction change is already queued for this tick.
        if (currentGame.nextDirection !== currentGame.currentDirection) {
          return currentGame;
        }

        // Don't allow reversing relative to the direction the snake actually moved last tick.
        if (isOppositeDirection(currentGame.currentDirection, requestedDirection)) {
          return currentGame;
        }

        return {
          ...currentGame,
          nextDirection: requestedDirection,
        };
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE_X}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE_Y}, 1fr)`,
        aspectRatio: `${GRID_SIZE_X} / ${GRID_SIZE_Y}`,
      }}
    >
      {cellIndices.map(index =>
        renderCell(index, game)
      )}
    </div>
  );
}
