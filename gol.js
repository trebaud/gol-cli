'use strict';
const React = require('react');
const {Box, Text} = require('ink');
const { produce } = require('immer');

const TEMPLATES = require('./templates');

const numRows = 30;
const numCols = 50;

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
  const grid = [];
  const startingPattern = TEMPLATES[template];
  if (!startingPattern) {
    // if no template was provided, init all cells randomnly
    for (let i = 0; i < numRows; i++) {
      grid.push(Array.from(Array(numCols), () => Math.random() > 0.9 ? 1 : 0));
    }

    return grid;
  }

  // if a template was provided init all cells at 0
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => 0));
  }

  for (const cellCoords of startingPattern) {
    const [x,y] = cellCoords;
    grid[x][y] = 1;
  }

  return grid;
};

const Gol = ({ cellColor = 'green', bgColor = '', template }) => {
  const [grid, setGrid] = React.useState(() => {
    return initGrid(template);
  });

  const runSimulation = React.useCallback(() => {
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
