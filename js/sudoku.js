let game, tilesToWin, playBoard, playBoardStr, solveBoard, solveBoardStr, bgm;
$('#level-test').click(function() {
    tilesToWin = 2;
    $('#game-level').text('Test');
    $('#score-detail').text('');
    solveBoard = generateSolveBoard(generatePlainBoard());
    solveBoardStr = solveBoard.map(arr => arr.join('')).join('');
    playBoard = generatePlayBoard(solveBoard, tilesToWin);
    playBoardStr = playBoard.map(arr => arr.join('')).join('');
    clearBoard();
    game = new Game(tileBoard);
    game.init();
    handleInit();
});

$('#level-easy').click(function() {
    tilesToWin = 43;
    $('#game-level').text('Easy');
    $('#score-detail').text('');
    solveBoard = generateSolveBoard(generatePlainBoard());
    solveBoardStr = solveBoard.map(arr => arr.join('')).join('');
    playBoard = generatePlayBoard(solveBoard, tilesToWin);
    playBoardStr = playBoard.map(arr => arr.join('')).join('');
    clearBoard();
    game = new Game(tileBoard);
    game.init();
    handleInit();
});

$('#level-medium').click(function() {
    tilesToWin = 57;
    $('#game-level').text('Medium');
    $('#score-detail').text('');
    solveBoard = generateSolveBoard(generatePlainBoard());
    solveBoardStr = solveBoard.map(arr => arr.join('')).join('');
    playBoard = generatePlayBoard(solveBoard, tilesToWin);
    playBoardStr = playBoard.map(arr => arr.join('')).join('');
    clearBoard();
    game = game || new Game(tileBoard);
    game.init();
    handleInit();
});

$('#level-hard').click(function() {
    tilesToWin = 65;
    $('#game-level').text('Hard');
    $('#score-detail').text('');
    solveBoard = generateSolveBoard(generatePlainBoard());
    solveBoardStr = solveBoard.map(arr => arr.join('')).join('');
    playBoard = generatePlayBoard(solveBoard, tilesToWin);
    playBoardStr = playBoard.map(arr => arr.join('')).join('');
    clearBoard();
    game = game || new Game(tileBoard);
    game.init();
    handleInit();
});

function handleInit() {
    setTimeout(function() {
        $('#board').show();
        $('#level-option-modal').modal('hide');
        $('#game-before').hide();
        $('#game-after').show();
        $('#score-board').show();
        $('#message-instruction').show();
        $('#score-detail').text('0');
        bgm.play();
        $('.fa-cog').addClass('fa-spin');
    }, 200);
}

function clearBoard() {
    $('.tile').remove();
}

function generatePlainBoard() {
    let board = [];
    for (let row = 0; row < 9; row++) {
        board.push([]);
        for (let col = 0; col < 9; col++) {
            board[row].push('.');
        }
    }
    return board;
}

let board = generatePlainBoard();

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

function shuffler() {
    let arr = Array(9).fill().map((k, v) => (v + 1).toString());
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

solveBoard = generateSolveBoard(board);
solveBoardStr = solveBoard.map(arr => arr.join('')).join('');

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

// let playBoard = generatePlayBoard(solveBoard, levelSelection('easy'));
