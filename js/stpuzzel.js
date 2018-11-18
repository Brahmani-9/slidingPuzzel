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
  //console.log("rows",rows);
  // Go through the rows
  for (let i = 0; i < rows.length; ++i) {
    var row = rows.item(i);
	//console.log("row",rows);
    // Go through the tiles on each row
    var tiles = row.querySelectorAll('.tile');
	//console.log("tiles",tiles);
    for (let j = 0; j < tiles.length; ++j) {
      var tile = tiles.item(j);
      // Add the click listener to the tile
      tile.addEventListener('click', makeMoveHandler(tile, i, j));
      // Set the location of the tile
      tile.style.marginLeft = j * 200 + 'px';
      tile.style.marginTop = i * 200 + 'px';
      // Set what part of the background to show on the tile
      tile.style.backgroundPosition = `${600 - j * 200}px ${600 - i * 200}px`;
	  //console.log("tiles",tile.style.backgroundPosition);
	  if(tile.style.backgroundPosition == rows){
		alert("You Win");
    }
	  
	
  }
  //var rows = document.querySelectorAll('.row');
	
}
};
// Initialize the tiles


initTiles();
shuffle();


class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));
