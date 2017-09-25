## Sudoku-go

This is an functional online game for brain-storming purpose built in jQuery.

[live][Sudoku-go]

- Author: Zidian Lyu
- Time: Aug-2017

## The view of app

- Home page

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/fullview.png" align="center" width="600" overflow="hidden">

## Steps to run

```bash
open index.html
```

## Features

### MVP

1. Player can select different difficulty level to play, the backend will generate various random game board.

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/level.png" align="center" width="600" overflow="hidden">

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/test.png" align="center" width="600" overflow="hidden">

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/easy.png" align="center" width="600" overflow="hidden">

2. When the user on hover an empty tag, all the numbers in full row, full column and full grid will be enlightened.

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/on_hover.png" align="center" width="600" overflow="hidden">

3. When the user tag on an empty tag, the game will eliminate all the pre-existed tiles and provide the remaining possible solutions.

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/possible_solution.png" align="center" width="600" overflow="hidden">

4. Tile-spin animation and score-mounting animation.

5. Allow user to interrupt and replay the game anytime.

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/replay.png" align="center" width="600" overflow="hidden">

6. Implement a background music box, which allows user to volume up/down; shuffle change music after the set playlist(without repeat).

    <img src="https://github.com/zidianlyu/Sudoku-go/blob/master/docs/music.png" align="center" width="600" overflow="hidden">

## Project Management

### File Structure

#### Templates

```html
index.html
```

#### Styling

```html
index.html(root)
    - <head>
        - css/game.css
            - init.css
            - board.css
            - tile.css
            - option.css
            - modal.css
            - music.css
            ...
        - css/ext
            - bootstrap
            - font-awesome
```

#### Javascript

```Javascript
index.html(root)
    - <body>
        - js/site scripts
        - js/ext/external scripts
```


## Code Implementation

##### in js/setup.js, bulid a prototype class for the Game

1. use prototype to build the board
```javascript
Game.prototype = {
    newTile: function(val, idx) {
        ...
    },

    setTileVal: function(tile, val, idx) {
        ...
    },

    init: function() {
        ...
    }
}
```

2. build the board in 1D array rather than 2D
```javascript
this.tiles = new Array(81);

init: function() {
    for (let i = 0; i < playBoardStr.length; i++) {
        let tile = this.newTile(playBoardStr[i], i);
        tile.setAttribute('index', i);
        this.container.appendChild(tile);
        this.tiles[i] = tile;
    }
}
```

##### In js/sudoku.js, backend handle to prepare for the algorithm part of the game

1. solve sudoku board(build the solve board in the first place)
```javascript
function generateSolveBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === '.') {
                for (let num of shuffler()) {
                    if (isValid(board, i, j, num)) {
                        board[i][j] = num
                        if (generateSolveBoard(board)) {
                            return board;
                        } else {
                            board[i][j] = '.';
                        }
                    }

                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    // col row check
    for (let n = 0; n < 9; n++)
        if (board[row][n] === num || board[n][col] === num)
            return false;

    row = ~~(row / 3) * 3;
    col = ~~(col / 3) * 3;
    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            if (board[i][j] === num) {
                return false;

            }
        }
    }
    return true;
}
```

2. emptify the solved board
```javascript
function generatePlayBoard(solveBoard, emptyCount) {
    let playBoard = solveBoard.map(arr => arr.slice());
    while (emptyCount > 0) {
        countArr = [];
        const row = ~~(Math.random() * 9);
        const col = ~~(Math.random() * 9);
        if (playBoard[row][col] !== '.') {
            playBoard[row][col] = '.';
            emptyCount--;
        }
    }
    return playBoard;
}
```

3. after select an empty tile, highlight all the exist num-tile in row, col and grid
```javascript
function addHighlight() {
    numSet = new Set();
    // highlight row neighbor
    let rowConst = ~~(selectPos / 9);
    for (let i = rowConst * 9; i < (rowConst + 1) * 9; i++) {
        if (!$(`#tile-${i}`).hasClass('tile-empty') && selectPos !== i + '') {
            numSet.add($(`#tile-${i}`).attr('class').slice(-1));
            $(`#tile-${i}`).addClass('tile-highlight-row');
        }
    }

    // highlight col neighbor
    let colConst = selectPos % 9;
    for (let j = colConst; j < 81; j += 9) {
        if (!$(`#tile-${j}`).hasClass('tile-empty') && selectPos !== j + '') {
            numSet.add($(`#tile-${j}`).attr('class').slice(-1));
            $(`#tile-${j}`).addClass('tile-highlight-col');
        }
    }
    let gridConstHead = ~~(selectPos / 3) * 3;
    let gridConstMod = gridConstHead % 9;
    let gridConst = gridConstMod + ~~(gridConstHead / 27) * 27;
    for (let a = gridConst; a < gridConst + 3; a++) {
        if (!$(`#tile-${a}`).hasClass('tile-empty') && selectPos !== a + '') {
            numSet.add($(`#tile-${a}`).attr('class').match(/[1-9]+/g).pop());
            $(`#tile-${a}`).addClass('tile-highlight-grid');
        }
    }
    gridConst += 9;
    for (let b = gridConst; b < gridConst + 3; b++) {
        if (!$(`#tile-${b}`).hasClass('tile-empty') && selectPos !== b + '') {
            numSet.add($(`#tile-${b}`).attr('class').match(/[1-9]+/g).pop());
            $(`#tile-${b}`).addClass('tile-highlight-grid');
        }
    }
    gridConst += 9;
    for (let c = gridConst; c < gridConst + 3; c++) {
        if (!$(`#tile-${c}`).hasClass('tile-empty') && selectPos !== c + '') {
            numSet.add($(`#tile-${c}`).attr('class').match(/[1-9]+/g).pop());
            $(`#tile-${c}`).addClass('tile-highlight-grid');
        }
    }
    buildOptionTile(numSet);
}
```

##### in js/engine.js, handle each event call

1. Set async handling
```javascript
setTimeout(function(){
    ...
}, 1800);
```

2. use clearTimeout to clear setTimeout before run the next async
```javascript
$('#level-hard').click(function() {
    clearTimeout(lastgame);
    handleInit();
});

function handleInit() {
    lastgame = setTimeout(function() {
        ...
    }, 200);
}
```

## DevOps and Deployment

##### The project is tested to be deployable on Github

## Reference and citations

[Bootstrap](http://getbootstrap.com/)

[Chartjs](http://www.chartjs.org/)

[Fontawesome](http://fontawesome.io/)


[Sudoku-go]:
https://zidianlyu.github.io/Sudoku-go/
