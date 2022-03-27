
//const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('nQueen performance test');

const testVal = 9;

window.countNQueensSolutionsOptimized = function(n) {
  var solutionCount = 0;
  if (n === 0) {
    solutionCount = 1;
  } else if (n === 2 || n === 3) {
    solutionCount = 0;
  } else {
    var queensInColumn = new Array(n).fill(false);
    var queensInMajorDiagonal = new Array(n * 2 - 1).fill(false);
    var queensInMinorDiagonal = new Array(n * 2 - 1).fill(false);
    var helperFunction = function(rowIndex, queensInColumn, queensInMajorDiagonal, queensInMinorDiagonal) {
      if (rowIndex === n) {
        return 1;
      }
      var count = 0;
      for (var colIndex = 0; colIndex < n; colIndex++) {
        if (colIndex - rowIndex >= 0) {
          var majorDiagonalIndex = colIndex - rowIndex;
        } else {
          var majorDiagonalIndex = (colIndex - rowIndex) + (n * 2 - 1);
        }
        var minorDiagonalIndex = rowIndex + colIndex;
        if (!queensInColumn[colIndex] && !queensInMajorDiagonal[majorDiagonalIndex] && !queensInMinorDiagonal[minorDiagonalIndex]) {
          queensInColumn[colIndex] = true;
          queensInMajorDiagonal[majorDiagonalIndex] = true;
          queensInMinorDiagonal[minorDiagonalIndex] = true;
          count += helperFunction(rowIndex + 1, queensInColumn, queensInMajorDiagonal, queensInMinorDiagonal);
          queensInColumn[colIndex] = false;
          queensInMajorDiagonal[majorDiagonalIndex] = false;
          queensInMinorDiagonal[minorDiagonalIndex] = false;
        }
      }
      return count;
    };
    solutionCount = helperFunction(0, queensInColumn, queensInMajorDiagonal, queensInMinorDiagonal);
  }

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensSolutions = function(n) {
  var solution = new Board({'n': n});

  let solutionCount = 0;
  var backtrack = function(rowIndex) {
    if (rowIndex === n) {

      solutionCount++;
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      //debugger;
      if (solution.isValidQueenPosition(rowIndex, colIndex)) {
        solution.togglePiece(rowIndex, colIndex);
        backtrack(rowIndex + 1);
        solution.togglePiece(rowIndex, colIndex);

      }
    }

  };
  backtrack(0);


  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

suite
  .add('countNQueensSolutionsOptimized#method', function () {
    window.countNQueensSolutionsOptimized(testVal);
  } )
  .add('countNQueensSolutions#method', function () {
    window.countNQueensSolutions(testVal);
  } )
  .on('cycle', function(event) {
    const benchmark = event.target;
    console.log(benchmark.toString());

  })
  .on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name');

    console.log(`The fastest option is ${fastestOption}`);
  })
  .run();


/*
  In the BenchmarkTest.html the console shows:
  countNQueensSolutionsOptimized#method x 1,029 ops/sec ±1.09% (62 runs sampled) bench.js:85
  countNQueensSolutions#method: bench.js:92

  The fastest option is countNQueensSolutionsOptimized#method


  have no idea why the original function won't show running time.


  */