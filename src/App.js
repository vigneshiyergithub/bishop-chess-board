import { useEffect, useState } from "react";
import "./App.css";

const intialState = Array.from(Array(8), () => new Array(8).fill(0));

function App() {
  const [chessBoard, setChessBoard] = useState(intialState);
  const [currentCell, setCurrentCell] = useState({
    rowIndex: null,
    colIndex: null,
  });
  const setActiveCell = (rowIndex, colIndex) => {
    const newBoard = [...intialState];
    newBoard[rowIndex][colIndex] = 1;
    setChessBoard(newBoard);
    setCurrentCell({ rowIndex, colIndex });
  };
  const onMouseLeave = () => {
    setChessBoard(intialState);
    setCurrentCell({ rowIndex : null, colIndex : null });
  }
  return (
    <div className="Chessboard-container">
      <header>Bishop chess board</header>
      <div className="Chessboard" onMouseLeave={onMouseLeave}>
        {chessBoard.map((row, rowIndex) => {
          return (
            <Row
              row={row}
              key={rowIndex}
              rowIndex={rowIndex}
              setActiveCell={setActiveCell}
              currentCell={currentCell}
            />
          );
        })}
      </div>
    </div>
  );
}

const Row = ({ row, rowIndex, setActiveCell, currentCell }) => {
  return (
    <div className="row-block">
      {row.map((col, colIndex) => {
        return (
          <Col
            col={col}
            key={colIndex}
            colIndex={colIndex}
            rowIndex={rowIndex}
            setActiveCell={setActiveCell}
            currentCell={currentCell}
          />
        );
      })}
    </div>
  );
};

const initialStyle = (isOdd) => ({
  background: isOdd ? "#000000" : "#ffffff",
  borderColor: isOdd ? "#ffffff" : "#000000",
});

const Col = ({ col, colIndex, rowIndex, setActiveCell, currentCell }) => {
  const isOdd = (colIndex + rowIndex + 1) % 2 !== 0;
  const [styles, setStyles] = useState(initialStyle(isOdd));
  const onHover = () => {
    setActiveCell(rowIndex, colIndex);
    setStyles({
      ...styles,
      background: "#70c8ff",
    });
  };
  useEffect(() => {
    const isDiagonal =
      currentCell?.rowIndex !== rowIndex &&
      currentCell.colIndex !== colIndex &&
      Math.abs(currentCell?.rowIndex - rowIndex) ===
        Math.abs(currentCell?.colIndex - colIndex);
    if (isDiagonal) {
      setStyles({
        ...styles,
        background: "#006aa7",
      });
    } else {
      setStyles(initialStyle(isOdd));
    }
    if (currentCell?.rowIndex === null && currentCell?.colIndex === null) {
      setStyles(initialStyle(isOdd));
    }
    if (currentCell?.rowIndex === rowIndex && currentCell?.colIndex === colIndex) {
      setStyles({
        ...styles,
        background: "#70c8ff",
        cursor : "pointer"
      });
    }
  }, [currentCell, rowIndex, colIndex, styles, isOdd]);
  const onMouseLeave = () => {
    setStyles(initialStyle(isOdd));
    setActiveCell(null, null);
  };
  return (
    <div
      className="col-block"
      style={styles}
      onMouseOver={onHover}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default App;
