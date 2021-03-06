let selectPos,
    emptyTileClassName,
    optionTileClassName,
    numSet,
    handleWrongMsg,
    animateTopPos,
    animateLeftPos,
    game,
    tilesToWin,
    playBoard,
    playBoardStr,
    solveBoard,
    solveBoardStr,
    bgm,
    lastgame;

window.onload = function() {
    tileBoard = document.getElementById('board');
    $('#level-option-modal').hide();
    $('#board').hide();
    setTimeout(function(){
        $('.faa-ring').removeClass('faa-ring');
        $('.faa-slow').removeClass('faa-slow');
        $('.faa-wrench').removeClass('faa-wrench');
    }, 1800);
}

$('#start-button').click(function() {
    $('#level-option-modal').modal('show')
});

$('#replay-button').click(function() {
    $('#level-option-modal').modal('show')
    $('#win-message').hide();
});

// choose empty tile
$('#board').click(function(e) {
    emptyTileClassName = e.target.className;
    clearHighlight();
    try {
        if (emptyTileClassName.indexOf('tile-empty') > -1) {
            if ($('.tile-empty-focus')) {
                $('.tile-empty-focus').removeClass('tile-empty-focus');
            }
            selectPos = emptyTileClassName.substring(emptyTileClassName.lastIndexOf('-') + 1);
            // Add plus-num-animation
            animateTopPos = parseInt($(`#tile-${selectPos}`).css('top')) - 1 + 'px';
            animateLeftPos = parseInt($(`#tile-${selectPos}`).css('left')) + 6 + 'px';

            if (parseInt(selectPos) > -1) {
                $(`#tile-${selectPos}`).addClass('tile-empty-focus');
                addHighlight();
                $('#option-board').show();
                $('.message').hide();
                $('#message-choose').show();
            } else {
                $('#message-choose').hide();
                $('#message-instruction').show();
                $('#option-board').hide();
            }
        }
    } catch (e) {
        console.log('not clickable', e);
    }
});

// choose option tile
$('#option-board').click(function(e) {
    optionTileClassName = e.target.className;
    if (optionTileClassName.indexOf('option-tile') > -1 && selectPos !== 'undefined') {
        let val = e.target.innerText;
        if (solveBoardStr[selectPos] === val) {
            // update score
            let newScore = (~~($('#score-detail').text()) || 0) + ~~(val);
            $('#score-detail').text(newScore);
            $('#score-detail').hide();
            $('#score-detail').fadeIn(600);

            // udpate new tile class
            let newTileID = `tile-${selectPos}`;
            $(`#${newTileID}`).removeClass('tile-empty');
            $(`#${newTileID}`).removeClass('tile-empty-focus');
            $(`#${newTileID}`).addClass(`tile${val}`);
            $(`#${newTileID}`).addClass(`tile-animation`);
            document.getElementById(newTileID).setAttribute('val', val);
            document.getElementById(newTileID).innerText = val;
            tilesToWin--;

            // PLUS TILE animation
            $('#board').append(`<span id="plus-tile">+${val}</span>`);
            $('#plus-tile').css('top', `${animateTopPos}`);
            $('#plus-tile').css('left', `${animateLeftPos}`);
            setTimeout(function() {
                $('#plus-tile').remove();
            }, 1000);

            // update state and clean up
            clearHighlight();
            $('#option-board').hide();
            $('#message-wrong').hide();
            $('#message-choose').hide();
            $('#message-instruction').hide();
            $('#message-correct').show();

            // Win the game
            if (tilesToWin === 0) {
                $('#score-final').text($('#score-detail').text());
                setTimeout(function() {
                    $('#score-board').hide();
                    $('.message').hide();
                    $('#board').hide();
                    $('.object-1').removeClass('faa-float faa-slow');
                    $('.object-2').removeClass('faa-wrench faa-slow');
                    $('#start-button').text('Replay');
                    $('#game-before').fadeIn(1000);
                    $('#win-message').fadeIn(1200);
                }, 1500)
            } else {
                // Correct tile
                if (handleWrongMsg) {
                    clearTimeout(handleWrongMsg);
                }
                setTimeout(function() {
                    $('#message-choose').hide();
                    $('#message-correct').hide();
                    $('#message-instruction').show();
                    // this wait time has to be longer than the reset time below
                }, 800);
            }

            // Tile animation
            setTimeout(function() {
                $(`#${newTileID}`).removeClass(`tile-animation`);
            }, 1500);
        } else {
            // Wrong Tile
            $('#message-choose').hide();
            $('#message-instruction').hide();
            $('#message-wrong').show();
            handleWrongMsg = setTimeout(function() {
                $('#message-wrong').hide();
                $('#message-choose').show();
            }, 800)
        }
    }
});

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

function clearHighlight() {
    $('.tile-highlight-row').removeClass('tile-highlight-row');
    $('.tile-highlight-col').removeClass('tile-highlight-col');
    $('.tile-highlight-grid').removeClass('tile-highlight-grid');
}

function buildOptionTile(set) {
    const check = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let arr = check.filter(x => !set.has(x));
    $('#option-board').children().remove();
    for (let n of arr) {
        $('#option-board').append(`<div class="option-tile option-tile-${n} tile${n}" value="${n}">${n}</div>`);
    }
}

$('#level-test').click(function() {
    tilesToWin = 2;
    $('#game-level').text('Test');
    clearTimeout(lastgame);
    handleInit();
});

$('#level-easy').click(function() {
    tilesToWin = 43;
    $('#game-level').text('Easy');
    clearTimeout(lastgame);
    handleInit();
});

$('#level-medium').click(function() {
    tilesToWin = 57;
    $('#game-level').text('Medium');
    clearTimeout(lastgame);
    handleInit();
});

$('#level-hard').click(function() {
    tilesToWin = 65;
    $('#game-level').text('Hard');
    clearTimeout(lastgame);
    handleInit();
});

function handleInit() {
    lastgame = setTimeout(function() {
        $('#score-detail').text('');
        $('#win-message').hide();
        $('.object-1').addClass('faa-float faa-slow');
        $('.object-2').addClass('faa-wrench faa-slow');
        solveBoard = generateSolveBoard(generatePlainBoard());
        solveBoardStr = solveBoard.map(arr => arr.join('')).join('');
        playBoard = generatePlayBoard(solveBoard, tilesToWin);
        playBoardStr = playBoard.map(arr => arr.join('')).join('');
        $('.tile').remove();
        game = game || new Game(tileBoard);
        game.init();
        $('#game-before').hide();
        $('#game-after').hide();
        $('.message').hide();
        $('#option-board').hide();
        $('#board').show();
        $('#level-option-modal').modal('hide');
        $('#game-after').show();
        $('#score-board').show();
        $('#message-instruction').show();
        $('#score-detail').text('0');
        bgm.play();
        $('.fa-cog').addClass('fa-spin');
        $('#play').parent().hide();
        $('#pause').parent().show();
    }, 200);
}
