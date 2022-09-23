'use strick';
var KING_WHITE = '♔';
var KING_BLACK = '♚';
var BISHOP_WHITE = '♗';
var BISHOP_BLACK = '♝';
var PAWN_WHITE = '♙';
var PAWN_BLACK = '♟';
var QUEEN_WHITE = '♕';
var QUEEN_BLACK = '♛';
var ROOK_WHITE = '♖';
var ROOK_BLACK = '♜';
var KNIGHT_WHITE = '♘';
var KNIGHT_BLACK = '♞';
var gGame = {
    isOn: false,
    isBlackTurn: false
};
var gBoard;
var gSelectedElCell = null;
function init() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    gGame.isOn = true;
    var tds = document.querySelectorAll('.td');
    tds.forEach(function (el) {
        return el.addEventListener('click', cellClicked);
    });
}
function cellClicked(ev) {
    if (ev.target instanceof Element) {
        if (ev.target.classList.contains('mark') && gSelectedElCell) {
            movePiece(gSelectedElCell, ev.target);
            cleanBoard();
            return;
        }
        cleanBoard();
        var isSelected = ev.target.classList.contains('selected');
        if (!isSelected) {
            ev.target.classList.add('selected');
            gSelectedElCell = ev.target;
        }
        console.log('ev.target.id: ', ev.target.id);
        var cellCoord = getCellCoord(ev.target.id);
        var piece = gBoard[cellCoord.i][cellCoord.j];
        var possibleCoords = [];
        switch (piece) {
            case KING_WHITE:
            case KING_BLACK:
                possibleCoords = getAllPossibleCoordsKing(cellCoord);
                break;
            case QUEEN_WHITE:
            case QUEEN_BLACK:
                possibleCoords = getAllPossibleCoordsQueen(cellCoord);
                break;
            case ROOK_BLACK:
            case ROOK_WHITE:
                possibleCoords = getAllPossibleCoordsRook(cellCoord);
                break;
            case BISHOP_BLACK:
            case BISHOP_WHITE:
                possibleCoords = getAllPossibleCoordsBishop(cellCoord);
                break;
            case KNIGHT_BLACK:
            case KNIGHT_WHITE:
                possibleCoords = getAllPossibleCoordsKnight(cellCoord);
                break;
            case PAWN_BLACK:
            case PAWN_WHITE:
                possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
                break;
        }
        markCells(possibleCoords);
    }
}
function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector("#cell-".concat(coord.i, "-").concat(coord.j));
        if (!elCell)
            return;
        elCell.innerHTML = '<span class="span"></span>';
        elCell.classList.add('mark');
    }
}
function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];
    var possibleSteps = [
        { i: -1, j: 0 },
        { i: 0, j: 1 },
        { i: -1, j: 1 },
        { i: -1, j: -1 },
        { i: 0, j: -1 },
        { i: 1, j: 0 },
        { i: 1, j: -1 },
        { i: 1, j: 1 },
    ];
    for (var k = 0; k < possibleSteps.length; k++) {
        var diffI = possibleSteps[k].i;
        var diffJ = possibleSteps[k].j;
        var nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ };
        if (nextCoord.i >= 0 &&
            nextCoord.i < 8 &&
            nextCoord.j >= 0 &&
            nextCoord.j < 8) {
            if (isEmptyCell(nextCoord))
                res.push(nextCoord);
        }
    }
    return res;
}
function getAllPossibleCoordsQueen(pieceCoord) {
    var res = [];
    var possibleDir = [
        // Bishop:
        { i: 1, j: -1 },
        { i: 1, j: 1 },
        { i: -1, j: -1 },
        { i: -1, j: 1 },
        // Rook:
        { i: -1, j: 0 },
        { i: 1, j: 0 },
        { i: 0, j: 1 },
        { i: 0, j: -1 }, // to left
    ];
    for (var k = 0; k < possibleDir.length; k++) {
        for (var i = 1; i <= 8; i++) {
            var diffI = i * possibleDir[k].i;
            var diffJ = i * possibleDir[k].j;
            var nextCoord = {
                i: pieceCoord.i + diffI,
                j: pieceCoord.j - diffJ
            };
            if (nextCoord.i > 7 ||
                nextCoord.i < 0 ||
                nextCoord.j > 7 ||
                nextCoord.j < 0) {
                break;
            }
            if (isEmptyCell(nextCoord)) {
                res.push(nextCoord);
            }
            else {
                break;
            }
        }
    }
    return res;
}
function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    var possibleDir = [
        { i: -1, j: 0 },
        { i: 1, j: 0 },
        { i: 0, j: 1 },
        { i: 0, j: -1 }, // to left
    ];
    for (var k = 0; k < possibleDir.length; k++) {
        for (var i = 1; i <= 8; i++) {
            var diffI = i * possibleDir[k].i;
            var diffJ = i * possibleDir[k].j;
            var nextCoord = {
                i: pieceCoord.i + diffI,
                j: pieceCoord.j + diffJ
            };
            if (nextCoord.i > 7 ||
                nextCoord.i < 0 ||
                nextCoord.j > 7 ||
                nextCoord.j < 0) {
                break;
            }
            if (isEmptyCell(nextCoord)) {
                res.push(nextCoord);
            }
            else {
                break;
            }
        }
    }
    console.log(res);
    return res;
}
function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var possibleDir = [
        { i: 1, j: -1 },
        { i: 1, j: 1 },
        { i: -1, j: -1 },
        { i: -1, j: 1 }, //topRight
    ];
    for (var k = 0; k < possibleDir.length; k++) {
        for (var i = 1; i <= 8; i++) {
            var diffI = i * possibleDir[k].i;
            var diffJ = i * possibleDir[k].j;
            var nextCoord = {
                i: pieceCoord.i + diffI,
                j: pieceCoord.j - diffJ
            };
            if (nextCoord.i > 7 ||
                nextCoord.i < 0 ||
                nextCoord.j > 7 ||
                nextCoord.j < 0) {
                break;
            }
            if (isEmptyCell(nextCoord)) {
                res.push(nextCoord);
            }
            else {
                break;
            }
        }
    }
    return res;
}
function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    var possibleSteps = [
        { i: -2, j: -1 },
        { i: -2, j: 1 },
        { i: -1, j: 2 },
        { i: -1, j: -2 },
        { i: 1, j: -2 },
        { i: 1, j: 2 },
        { i: 2, j: 1 },
        { i: 2, j: -1 },
    ];
    for (var k = 0; k < possibleSteps.length; k++) {
        var diffI = possibleSteps[k].i;
        var diffJ = possibleSteps[k].j;
        var nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ };
        if (nextCoord.i >= 0 &&
            nextCoord.i < 8 &&
            nextCoord.j >= 0 &&
            nextCoord.j < 8) {
            if (isEmptyCell(nextCoord))
                res.push(nextCoord);
        }
    }
    return res;
}
function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];
    var diff = isWhite ? -1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord))
        res.push(nextCoord);
    else
        return res;
    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord))
            res.push(nextCoord);
    }
    return res;
}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-');
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}
function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === '';
}
function movePiece(elFromCell, elToCell) {
    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    // update the MODEL
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    elFromCell.innerText = '';
    elToCell.innerText = piece;
}
function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}
function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // figure class name
            var className = (i + j) % 2 === 0 ? 'white' : 'black';
            var tdId = "cell-".concat(i, "-").concat(j);
            strHtml += "<td id=\"".concat(tdId, "\" data-i=\"").concat(i, "\" data-j=\"").concat(j, "\" class=\"").concat(className, " td\" >            \n                    ").concat(cell, "                   \n                  </td>");
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('table');
    if (elMat)
        elMat.innerHTML = strHtml;
}
function buildBoard() {
    //build the board 8 * 8
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = '';
            if (i === 1)
                piece = PAWN_BLACK;
            if (i === 6)
                piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;
    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[4][4] = KING_WHITE;
    // console.table(board)
    return board;
}
