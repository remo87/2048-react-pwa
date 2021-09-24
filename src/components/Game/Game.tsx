import React, { useEffect } from "react";
import { useThrottledCallback } from "use-debounce";

import { useGame } from "./hooks/useGame";
import { Board, animationDuration, tileCount } from "../Board";

export const Game = () => {
  const [tiles, moveLeft, moveRight, moveUp, moveDown] = useGame();

  const handleKeyDow = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }
  };

  const throttleHandleKeyDown = useThrottledCallback(
    handleKeyDow,
    animationDuration,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    window.addEventListener("keydown", throttleHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttleHandleKeyDown);
    };
  }, [throttleHandleKeyDown]);

  return <Board tiles={tiles} tileCountPerRow={tileCount} />;
};
