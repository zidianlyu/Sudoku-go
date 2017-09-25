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
