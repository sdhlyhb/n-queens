// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

   */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardMatrix = this.rows();
      for (var i = 0; i < boardMatrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var boardMatrix = this.rows();
      var rowCount = this.get('n');
      var count = 0;
      for (var i = 0; i < rowCount; i++) {
        if (boardMatrix[i][colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardMatrix = this.rows();
      var colCount = this.get('n');
      for (var i = 0; i < colCount; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // checkMajorDiagonalConflictAt: function(majorDiagonalRowIndexAtFirstColumn) {
    //   var boardMatrix = this.rows();
    //   var rowIndex = majorDiagonalRowIndexAtFirstColumn;
    //   var colIndex = 0;
    //   var count = 0;

    //   while (this._isInBounds(rowIndex, colIndex)) {
    //     if (boardMatrix[rowIndex][colIndex] === 1) {
    //       count++;
    //     }
    //     rowIndex++;
    //     colIndex++;
    //   }
    //   return count > 1;
    // },


    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   var boardMatrix = this.rows();
    //   var rowIndex = 0;
    //   var colIndex = majorDiagonalColumnIndexAtFirstRow;
    //   var count = 0;

    //   while (this._isInBounds(rowIndex, colIndex)) {
    //     if (boardMatrix[rowIndex][colIndex] === 1) {
    //       count++;
    //     }
    //     rowIndex++;
    //     colIndex++;
    //   }
    //   return count > 1;
    // },

    // // test if any major diagonals on this board contain conflicts
    // hasAnyMajorDiagonalConflicts: function() {
    //   var numberOfRows = this.get('n');
    //   for (var i = 0; i < numberOfRows; i++) {
    //     if (this.hasMajorDiagonalConflictAt(i) || this.checkMajorDiagonalConflictAt(i)) {
    //       return true;
    //     }
    //   }
    //   return false;


    // },





    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // checkMinorDiagonalConflictAt: function(minorDiagonalRowIndexAtLastCol) {
    //   var boardMatrix = this.rows();
    //   var rowIndex = minorDiagonalRowIndexAtLastCol;
    //   var colIndex = this.get('n') - 1;
    //   var count = 0;
    //   while (this._isInBounds(rowIndex, colIndex)) {
    //     if (boardMatrix[rowIndex][colIndex] === 1) {
    //       count++;
    //     }
    //     rowIndex++;
    //     colIndex--;
    //   }
    //   return count > 1;

    // },



    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    //   var boardMatrix = this.rows();
    //   var rowIndex = 0;
    //   var colIndex = minorDiagonalColumnIndexAtFirstRow;
    //   var count = 0;
    //   while (this._isInBounds(rowIndex, colIndex)) {
    //     if (boardMatrix[rowIndex][colIndex] === 1) {
    //       count++;
    //     }
    //     rowIndex++;
    //     colIndex--;
    //   }
    //   return count > 1;

    // },

    // // test if any minor diagonals on this board contain conflicts
    // hasAnyMinorDiagonalConflicts: function() {
    //   var numberOfRows = this.get('n');
    //   for (var i = 0; i < numberOfRows; i++) {
    //     if (this.hasMinorDiagonalConflictAt(i) || this.checkMinorDiagonalConflictAt(i)) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var rowIndex, colIndex;
      var board = this.rows();
      var pieces = 0;

      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        colIndex = 0;
      } else {
        rowIndex = 0;
        colIndex = majorDiagonalColumnIndexAtFirstRow;
      }

      while (this._isInBounds(rowIndex, colIndex)) {
        if (board[rowIndex][colIndex] === 1) {
          pieces++;
        }
        rowIndex++;
        colIndex++;
      }

      return pieces > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rowIndex = 0;
      var colIndex = 0;
      var lastIndex = this.get('n') - 1;
      for (var i = 0; i <= lastIndex; i++) {
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0, colIndex))) {
          return true;
        }
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, 0))) {
          return true;
        }
        rowIndex++;
        colIndex++;
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rowIndex, colIndex;
      var board = this.rows();
      var pieces = 0;
      var colTotal = this.get('n');

      if (minorDiagonalColumnIndexAtFirstRow >= colTotal) {
        rowIndex = minorDiagonalColumnIndexAtFirstRow - colTotal;
        colIndex = colTotal - 1;
      } else {
        rowIndex = 0;
        colIndex = minorDiagonalColumnIndexAtFirstRow;
      }

      while (this._isInBounds(rowIndex, colIndex)) {
        if (board[rowIndex][colIndex] === 1) {
          pieces++;
        }
        rowIndex++;
        colIndex--;
      }

      return pieces > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rowIndex = 0;
      var colIndex = 0;
      var lastIndex = this.get('n') - 1;
      for (var i = 0; i <= lastIndex; i++) {
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(lastIndex, colIndex))) {
          return true;
        }
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, 0))) {
          return true;
        }
        rowIndex++;
        colIndex++;
      }
      return false;
    },



    //add a position checking helper function:
    isValidRookPosition: function (rowIndex, colIndex) {
      this.togglePiece(rowIndex, colIndex);
      var boolean = this.hasAnyRooksConflicts();
      this.togglePiece(rowIndex, colIndex);
      return !boolean;

    },

    isValidQueenPosition: function (rowIndex, colIndex) {
      this.togglePiece(rowIndex, colIndex);
      var boolean = this.hasAnyQueensConflicts();
      this.togglePiece(rowIndex, colIndex);
      return !boolean;

    }


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
