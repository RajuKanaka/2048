// global variable
var list = [];
var origin = 0;
var moveObj = {
  left: {
    i: [0, 1, 2],
    k: [0, 1, 2, 3],
  },
  right: {
    i: [3, 2, 1],
    k: [0, 1, 2, 3],
  },
  up: {
    i: [0, 1, 2],
    k: [0, 1, 2, 3],
  },
  down: {
    i: [3, 2, 1],
    k: [3, 2, 1, 0],
  },
};
var addObj = {
  left: {
    i: [1, 2, 3],
    k: [0, 1, 2, 3],
  },
  right: {
    i: [3, 2, 1],
    k: [3, 2, 1, 0],
  },
};
var colour = {
  0: "#cbc1b4",
  2: "#eee4da",
  4: "#fae1b1",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#eec850",
  1024: "#bef1fe",
  2048: "#FDD017",
};
var id1;
var list1;
var score = 0;
random();
random();
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//random function
function random() {
  document.getElementById("score").textContent = score;
  id1 = Math.ceil(Math.random() * 16);
  var a = document.getElementById(id1).innerText;
  if (a == "") {
    if (id1 <= 8) {
      document.getElementById(id1).innerText = "2";
      document.getElementById(id1).style.background = colour["2"];
    } else {
      document.getElementById(id1).innerText = "4";
      document.getElementById(id1).style.background = colour["4"];
    }
  } else {
    random();
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//take value function
function list2() {
  list1 = [[], [], [], []];
  for (i = 1; i <= 16; i++) {
    var key = Math.ceil(i / 4);
    list1[key - 1].push(document.getElementById(i).innerHTML);
  }
  return list1;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//start function
function start(event) {
  var key_value = event.keyCode;
  list2();
  if (key_value === 37) {
    //left
    move(moveObj.left.k, moveObj.left.i, left_arrow, 1);
  } else if (key_value === 38) {
    //up
    move(moveObj.up.k, moveObj.up.i, up_arrow, 1);
  } else if (key_value === 39) {
    //right
    move(moveObj.right.k, moveObj.right.i, right_arrow, 1);
  } else if (key_value === 40) {
    //down
    move(moveObj.down.k, moveObj.down.i, down_arrow, 1);
  }
}
document.body.addEventListener("keyup", start);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//moving function
function move(list3, list4, cb, count) {
  var h = 4;
  while (h--) {
    for (k of list3) {
      for (i of list4) {
        cb(i, k);
      }
    }
  }
  if (count == 1) {
    cb(i, k);
    if (cb == left_arrow) {
      add(addObj.left.k, addObj.left.i, leftAdd);
    } else if (cb == down_arrow) {
      add(addObj.right.k, addObj.right.i, downAdd);
    } else if (cb == up_arrow) {
      add(addObj.left.k, addObj.left.i, upAdd);
    } else if (cb == right_arrow) {
      add(addObj.right.k, addObj.right.i, rightAdd);
    }
  } else if (count == 2) {
    printing(list1);
    random();
  }
}

function up_arrow(i, k) {
  if (list1[i][k] === "") {
    list1[i][k] = list1[i + 1][k];
    list1[i + 1][k] = "";
  }
}

function down_arrow(i, k) {
  if (list1[i][k] === "") {
    list1[i][k] = list1[i - 1][k];
    list1[i - 1][k] = "";
  }
}

function left_arrow(i, k) {
  if (list1[k][i] === "") {
    list1[k][i] = list1[k][i + 1];
    list1[k][i + 1] = "";
  }
}

function right_arrow(i, k) {
  if (list1[k][i] === "") {
    list1[k][i] = list1[k][i - 1];
    list1[k][i - 1] = "";
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------

//add function
function add(list3, list4, cb) {
  for (k of list3) {
    for (i of list4) {
      cb(k, i);
    }
  }

  if (cb == leftAdd) {
    move(moveObj.left.k, moveObj.left.i, left_arrow, 2);
  } else if (cb == downAdd) {
    move(moveObj.down.k, moveObj.down.i, down_arrow, 2);
  } else if (cb == upAdd) {
    move(moveObj.up.k, moveObj.up.i, up_arrow, 2);
  } else if (cb == rightAdd) {
    move(moveObj.right.k, moveObj.right.i, right_arrow, 2);
  }
}

function upAdd(k, i) {
  if (list1[i - 1][k] == list1[i][k]) {
    list1[i - 1][k] = Number(list1[i - 1][k]) + Number(list1[i][k]);
    score += Number(list1[i - 1][k]);
    list1[i][k] = "";
  }
}

function downAdd(k, i) {
  if (list1[i - 1][k] == list1[i][k]) {
    list1[i][k] = Number(list1[i - 1][k]) + Number(list1[i][k]);
    score += Number(list1[i - 1][k]);
    list1[i - 1][k] = "";
  }
}

function leftAdd(k, i) {
  if (list1[k][i] === list1[k][i - 1]) {
    list1[k][i] = Number(list1[k][i - 1]) + Number(list1[k][i - 1]);
    score += Number(list1[k][i]);
    list1[k][i - 1] = "";
  }
}

function rightAdd(k, i) {
  if (list1[k][i] === list1[k][i - 1]) {
    list1[k][i - 1] = Number(list1[k][i - 1]) + Number(list1[k][i]);
    score += Number(list1[k][i - 1]);
    list1[k][i] = "";
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//printing  function
function printing(list) {
  for (var x = 0, y = 1; x < 4; x++) {
    for (var z = 0; z < 4; z++) {
      if (list[x][z] == 0) {
        list[x][z] = "";
      }
      document.getElementById(y).innerText = list[x][z];
      var colors = Number(list[x][z]) % 4096;
      document
        .getElementById(y)
        .setAttribute(
          "style",
          "background-color:" + colour[colors] + ";text-align:center;"
        );
      y++;
    }
  }
  check();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//lose function
/*
function check()
	{ chan=false;
        stop : for(var i=0;i<3;i++)
	{
	 for (var j=0;j<3;j++)
	{
	 if (list1[i][j]==list1[i][j+1]&&list1[i][j]==list1[i+1][j])
	{
	  chan=true;
          break stop;
	}
	}
  if(chan==false)
	{
	alert("GameOver");
            newGame();
	}
	}

	}*/
function check() {
  list = [];
  origin = 0;
  for (let i = 1; i <= 16; i++) {
    list.push(document.getElementById(i).innerText);
    if (list[i - 1].length > 0) {
      origin++;
    }
  }
  if (origin == 16) {
    console.log(list);
    if (
      list[0] != list[1] &&
      list[1] != list[2] &&
      list[2] != list[3] &&
      list[4] != list[5] &&
      list[5] != list[6] &&
      list[6] != list[7] &&
      list[8] != list[9] &&
      list[9] != list[10] &&
      list[10] != list[11] &&
      list[12] != list[13] &&
      list[13] != list[14] &&
      list[14] != list[15] &&
      list[0] != list[4] &&
      list[1] != list[5] &&
      list[2] != list[6] &&
      list[3] != list[7] &&
      list[4] != list[8] &&
      list[5] != list[9] &&
      list[6] != list[10] &&
      list[7] != list[11] &&
      list[8] != list[12] &&
      list[9] != list[13] &&
      list[10] != list[14] &&
      list[11] != list[15]
    ) {
      alert("GameOver");
      newGame();
    }
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//new game function
function newGame() {
  for (var i = 1; i <= 16; i++) {
    document.getElementById(i).innerText = "";
    document
      .getElementById(i)
      .setAttribute(
        "style",
        "background:'#cdc1b4';box-shadow:0px 0px 0px 10px #bbada0;"
      );
  }
  score = 0;
  random();
  random();
}
//--------------------------------------------------------------------------------------------------------------------------------------------
