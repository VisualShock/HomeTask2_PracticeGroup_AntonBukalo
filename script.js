let arr=[],game,ei=3,ej=3;

function shuffle(arr){
    let j, temp;
    for (let i = 14;i>0;i--){
        j = Math.floor(Math.random() * (i));
        let k = (Math.floor(j/4));//rows
        let l = j - Math.floor(j/4)*4;//columns
        let arrI = (Math.floor(i/4));
        let arrJ = i -(Math.floor(i/4))*4;
        temp =  arr[arrI][arrJ];
        arr[arrI][arrJ] = arr[k][l];
        arr[k][l] = temp;
    }
    return arr;
}

function checkSolutions(arr){
    let inc = 0;
    for (let i = 15;i>0;i--){
        let ik = (Math.floor(i/4));//rows
        let il = i - Math.floor(i/4)*4;//columns
        for (let j = 15;j>i;j--){
            let k = (Math.floor(j/4));//rows
            let l = j - Math.floor(j/4)*4;//columns
            if (arr[ik][il]>arr[k][l])inc++;
        }
    }
    if (inc%2==0) return true;
    else return false;
}

window.onload = function() {
    game = document.getElementById("game");
    newGame();
};

function clickEvent(e) {
    var el = e.srcElement || e.target;
    let i = el.id.charAt(0),
        j = el.id.charAt(2);
    console.log(el.innerHTML);
    if (
        (i == ei && Math.abs(j - ej) == 1) ||
        (j == ej && Math.abs(i - ei) == 1)
    ) {
        document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
        el.innerHTML = "";
        ei = i;
        ej = j;
        var victory = true;
        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1){
                    victory = false;
                    break;
                }
                if (victory)alert("VICTORY!!");
    }
}

function newGame() {
    arr = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,""]];//generate game buttons
    arr = shuffle(arr);// shuffle game buttons
    while (checkSolutions(arr)==false) //check solutions and shuffle
        arr = shuffle(arr);
    var table = document.createElement("table"),// create board
        twrapper = document.createElement("twrapper");
    table.appendChild(twrapper);
    for (i = 0; i < 4; i++) {
        var row = document.createElement("tr");
        for (j = 0; j < 4; j++) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.onclick = clickEvent;
            cell.innerHTML = arr[i][j];
            row.appendChild(cell);
        }
        twrapper.appendChild(row);
    }
    if (game.childNodes.length == 1) game.removeChild(game.firstChild);
    game.appendChild(table);
}