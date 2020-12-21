'use strict';
const React = require('react');
const {Box, Text} = require('ink');
const { produce } = require('immer');

const numRows = 15;
const numCols = 30;

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

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => Math.random() > 0.8 ? 1 : 0));
  }

  return rows;
};

const App = () => {
  const [grid, setGrid] = React.useState(() => {
    return generateEmptyGrid();
  });

  const [running,] = React.useState(true);

  const runningRef = React.useRef(running);
  runningRef.current = running;

  const runSimulation = React.useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
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
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  React.useEffect(() => {
    runSimulation()
	}, []);

  return (
    <Box flexDirection="column" padding={1}>
      {grid.map((rows, i) => (
        <Box key={i}>
          {rows.map((_col, k) => (
            <Box key={k} borderStyle="single">
              <Text backgroundColor={grid[i][k] ? 'green' : ''}>{'   '}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

module.exports = App;
