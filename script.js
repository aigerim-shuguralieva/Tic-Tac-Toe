let area = document.getElementById('area') // поле
let cells = document.getElementsByClassName('cell') // ячейка
let whoWins = document.getElementById('whoWins') // ким утту
let currentPlayer = document.getElementById('currentPl') // азыркы игрок/ кимдин журушу
let roundHistory = [] // раундтардын историясы сакталат
let player = 'X'
let stat = {
    'X': 0,
    'O': 0,
    'D': 0
} // статистиканын объект шаблону
let winCombination = [ // утуу комбинациялары
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]
for (let i = 1; i <= 9; i++) { // Тогуз ячейка жаздырабыз
    area.innerHTML += `<div class="cell" pos="${i}"></div>`
}
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellOnclick)//ар бир ячейкага онклик функ. илештирдик
}
function cellOnclick() {
    let data = []
    if (!this.innerHTML) { // ячейканы текшеребиз
        this.innerHTML = player
    } else {
        alert('Cell is full!')
        return;
    }
    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }
    if (checkWinner(data)) {
        stat[player] += 1 // статистика озгормону жанылатабыз
        whoWins.innerHTML = 'win ' + [player]
        document.getElementById('roundHistory').innerHTML += `win ${player} ,</br>`// кайсы оюнчу утса ошол оюнчунун аты тизмекке тушот
        refresh()
        roundHistory.push(whoWins.innerHTML)
    } else {
        let draw = true
        for (let i in cells) {
            if (cells[i].innerHTML == '') draw = false;
        }
        if (draw) {
            stat.D += 1
            whoWins.innerHTML = 'Draws'
            document.getElementById('roundHistory').innerHTML += `Draws, </br>`
            refresh()
            roundHistory.push(whoWins.innerHTML)
        }
    }
   
    player = player === "X" ? "O" : "X"
    currentPlayer.innerHTML = player
}
function checkWinner(data) {
    for (let i in winCombination) {
        let win = true;
        for (let j in winCombination[i]) {
            let id = winCombination[i][j];
            let ind = data.indexOf(id)
            if (ind == -1) {
                win = false
            }
        }
        if (win) return true
    }
    return false
}
function refresh() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    updateStat()
    updateRoundHistory()
}
function updateStat() {
    document.getElementById('sX').innerHTML = stat.X;
    document.getElementById('sO').innerHTML = stat.O;
    document.getElementById('sD').innerHTML = stat.D;
}
function updateRoundHistory(){
    document.getElementById('roundHistory').innerHTML = roundHistory
}