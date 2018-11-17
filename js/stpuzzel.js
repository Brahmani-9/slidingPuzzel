// This is the location of the empty square. At the start it's at 2, 2
var emptyRow = 2;
var emptyCol = 2;

// i and j, as passed in, are the tiles' original coordinates
var makeMoveHandler = function (tile, i, j) {
	
  // row and col, as made here in closure, are the tiles up-to-date coordinates
  var row = i;
  var col = j;
  // The click handler
  return function () {
    var rowOffset = Math.abs(emptyRow - row);
    var colOffset = Math.abs(emptyCol - col);
    // Move the tile to the vacant place next to it
    if (rowOffset == 1 && colOffset == 0 || rowOffset == 0 && colOffset == 1) {
      tile.style.marginLeft = emptyCol * 200 + 'px';
      tile.style.marginTop = emptyRow * 200 + 'px';
      // Swap the two coordinates
      [row, emptyRow] = [emptyRow, row];
      [col, emptyCol] = [emptyCol, col];
    }
  }
};
var shuffle = function () {
  var rows = document.querySelectorAll('.row');
  for (let i = 0; i < 200; ++i) {
    var row = ~~(Math.random() * rows.length);
    var tiles = rows.item(row).querySelectorAll('.tile');
    var tile = ~~(Math.random() * tiles.length);
    tiles.item(tile).click();
  }
};
var initTiles = function () {
  // Get all of the rows
  var rows = document.querySelectorAll('.row');
  // Go through the rows
  for (let i = 0; i < rows.length; ++i) {
    var row = rows.item(i);
    // Go through the tiles on each row
    var tiles = row.querySelectorAll('.tile');
    for (let j = 0; j < tiles.length; ++j) {
      var tile = tiles.item(j);
      // Add the click listener to the tile
      tile.addEventListener('click', makeMoveHandler(tile, i, j));
      // Set the location of the tile
      tile.style.marginLeft = j * 200 + 'px';
      tile.style.marginTop = i * 200 + 'px';
      // Set what part of the background to show on the tile
      tile.style.backgroundPosition = `${600 - j * 200}px ${600 - i * 200}px`;
    }
  }
};
// Initialize the tiles

initTiles();
shuffle();
