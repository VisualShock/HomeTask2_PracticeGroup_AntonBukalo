/*
    Code is very similar to Syzov Vladyslav and Viktor Panchenko work
    Reworked slightly but still can be identified :)
*/

/*
  Don't use such school pascal lessons style
  It is very hard to get what is going on in your code :)

  A lot of hardcoded values

  Why arr is global if you use it only in the one routine
*/
let arr=[],game,ei,ej;

/*
    Too complicated logic for shuffling
*/
function shuffle(arr){
    /*
        You defined a bunch of variables in the loop scope
        but these 2 in the function scope
        for what?

        Guess they also can be defined in the loop scope :)
    */
    let j, temp;
    for (let i = 14;i>0;i--){
        j = Math.floor(Math.random() * (i));
        let k = (Math.floor(j/4));//rows
        /* (Math.floor(j/4)) already defined as k */
        let l = j - Math.floor(j/4)*4;//columns
        let arrI = (Math.floor(i/4));
        /* (Math.floor(i/4)) already defined as arrI */
        let arrJ = i - (Math.floor(i/4))*4;
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
    /*
        just: return inc % 2 == 0;
    */
    if (inc%2==0) return true;
    else return false;
}

/*
  Use of DOM Level 2 events (addEventListener) is better practice
*/
window.onload = function() {
    game = document.getElementById("game");
    newGame();
};

/*
  Code is very messy
  You have to divide logic for more routines
  instead of having all in one
*/
function clickEvent(e) {
    /*
        Bad idea to use element`s id as data storage
        event.target instead of event.srcElement or just 'this' as long as you hadn't overrided context for your handler
    */
    var el = e.srcElement || e.target;
    let i = el.id.charAt(0),
        j = el.id.charAt(2);
    console.log(el.innerHTML);

    /*
        A lot of nested constructions
    */
    if (
        (i == ei && Math.abs(j - ej) == 1) ||
        (j == ej && Math.abs(i - ei) == 1)
    ) {
        document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
        el.innerHTML = "";
        ei = i;
        ej = j;
        var victory = true;

        /*
          Very strange win verification
          Could use much more simplier
        */
        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1){
                    victory = false;
                    /*
                        This break will return only from 1 loop
                        But once you got your flag false you have to break both
                    */
                    break;
                }
                if (victory)alert("VICTORY!!");
    }
}

function newGame() {
    arr = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,""]];//generate game buttons
    arr = shuffle(arr);// shuffle game buttons
    ei = 3,ej = 3;
    while (checkSolutions(arr)==false) //check solutions and shuffle
        arr = shuffle(arr);
    var table = document.createElement("table"),// create board
    /*
        twrapper is not valid html element
    */
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

    /*
        No need for this verification
        Just clean box content (box.innerHTML = '') and insert your table
    */
    if (game.childNodes.length == 1) game.removeChild(game.firstChild);
    game.appendChild(table);
}
