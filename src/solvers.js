/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*******the helper function below needs more work****************/

//helper function: which will return an array of valid solutions:

// window.findAllValidNRooksSolution = function(n) {
//   var solution, colIndex, rowIndex;
//   var board = new Board({'n': n});
//   var workingSolutions = [];
//   var findSolutions = function(rowIndex, colIndex) {
//     board.togglePiece(rowIndex, colIndex);
//     debugger;
//     //console.log(board.rows());
//     if (board.hasAnyRooksConflicts()) {
//       //toggle it now or later in the recursive call?

//       return;
//     }
//     if (rowIndex === n ) {
//       workingSolutions.push(board.rows());
//       return;
//     }
//     for (var r = rowIndex; r < n; r++) {
//       for (var c = 0; c < n; c++) {
//         findSolutions(r, c);
//         board.togglePiece(r, c);
//       }
//       // board.togglePiece(r, colIndex);
//     }

//   };
//   findSolutions(0, 0);
//   return workingSolutions;


// };



// if we just wanna find one valid solution:
window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  var rooks = n; // there is n rooks to place; expect the numbers to be 0 in the end;
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      solution.togglePiece(rowIndex, colIndex); //place a rook at this position;
      rooks--;

      //if has conflicts, remove the rook from current position and check next position;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(rowIndex, colIndex);
        rooks++;
      } else {
        continue;
      }
    }
  }
  // if all the rooks are placed, we should reach a valid solution;
  if (rooks === 0) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution.rows();
  }





};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {

  // helper:
  var helperFactorial = function(n) {
    if (n === 1) {
      return 1;
    }
    return n * helperFactorial(n - 1);

  };

  var solutionCount = helperFactorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  debugger;
  var queen = n; // there is n rooks to place; expect the numbers to be 0 in the end;
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      solution.togglePiece(rowIndex, colIndex); //place a rook at this position;
      queen--;

      //if has conflicts, remove the rook from current position and check next position;
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(rowIndex, colIndex);
        queen++;
      } else {
        continue;
      }
    }
  }
  // if all the rooks are placed, we should reach a valid solution;
  if (queen === 0) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution.rows();
  } else {
    return 'no valid solution!';
  }


};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
