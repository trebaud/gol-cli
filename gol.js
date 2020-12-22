'use strict';
const React = require('react');
const {Box, Text} = require('ink');
const { produce } = require('immer');

const numRows = 25;
const numCols = 50;

const TEMPLATES = {
  glider: [[1,2], [2,3], [3,1], [3,2], [3,3]],
  gosper: [
    [1,25],
    [2,23], [2, 25],
    [3,13], [3,14], [3,21], [3,22], [3,35], [3,36],
    [4,12], [4,16], [4,21], [4,22], [4,35], [4,36],
    [5,1], [5,2], [5,11], [5,17], [5,21], [5,22],
    [6,1], [6,2], [6,11], [6,15], [6,17], [6,18], [6,23], [6,25],
    [7,11], [7,17], [7,25],
    [8,12], [8,16],
    [9,13], [9,14],
  ],
  pulsar: [
    [1,3], [1,4], [1,5], [1,9], [1,10], [1,11],
    [3,1], [4,1], [5,1], [3,6], [4,6], [5,6], [3,8], [4,8], [5,8], [3,13], [4,13], [5,13],
    [6,3], [6,4], [6,5], [6,9], [6,10], [6,11],
    [8,3], [8,4], [8,5], [8,9], [8,10], [8,11],
    [9,1], [10,1], [11,1], [9,6], [10,6], [11,6], [9,8], [10,8], [11,8], [9,13], [10,13], [11,13],
    [13,3], [13,4], [13,5], [13,9], [13,10], [13,11],
  ],
}

const OPERATIONS = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const initGrid = (template) => {
  const rows = [];
  const startingPattern = TEMPLATES[template];
  if (!startingPattern) {
    // if no template was provided, init all cells randomnly
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > 0.9 ? 1 : 0));
    }

    return rows;
  }

  // if a template was provided init all cells at 0
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  for (const cellCoord of startingPattern) {
    const [x,y] = cellCoord;
    rows[x][y] = 1;
  }

  return rows;
};

const Gol = ({ cellColor = 'green', bgColor = '', template }) => {
  const [grid, setGrid] = React.useState(() => {
    return initGrid(template);
  });

  const [running,] = React.useState(true);

  const runSimulation = React.useCallback(() => {
    if (!running) {
      return;
    }

    setGrid(g => {
      return produce(g, gridClone => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            OPERATIONS.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridClone[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridClone[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 0);
  }, []);

  React.useEffect(() => {
    runSimulation();
	}, []);

  return (
    <Box flexDirection="column" padding={1}>
      {grid.map((rows, i) => (
        <Box key={i}>
          {rows.map((_col, j) => (
            <Box key={j}>
              <Text backgroundColor={grid[i][j] ? cellColor : bgColor}>{'  '}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

module.exports = Gol;
