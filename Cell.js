// Cell.js

import React, { useState } from "react";
import "./Cell.css";


/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Board({ nrows, ncols }) {
  // Create the initial board with random lit cells
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < 0.5); // 50% chance of being lit
      }
      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(createBoard);

  const flipCellsAroundMe = (row, col) => {
    // Create a copy of the board
    const newBoard = [...board];

    // Toggle the clicked cell
    newBoard[row][col] = !newBoard[row][col];

    // Toggle the adjacent cells (up, down, left, right)
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      // Check if the new coordinates are within the board boundaries
      if (newRow >= 0 && newRow < nrows && newCol >= 0 && newCol < ncols) {
        newBoard[newRow][newCol] = !newBoard[newRow][newCol];
      }
    }

    // Update the state with the new board
    setBoard(newBoard);
  };

  return (
    <table className="Board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((isLit, colIndex) => (
              <Cell
                key={colIndex}
                flipCellsAroundMe={() => flipCellsAroundMe(rowIndex, colIndex)}
                isLit={isLit}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}



function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAroundMe} />;
}


export default Cell;

