window.onload = function(){

  var playerTurn = document.getElementsByClassName("playerTurn")[0];
  var turn = 1; //1=X, 0=O
  var turnChar = ["O","X"];
  var turnText = ["It is O's turn","It is X's turn"];
  var winText1 = "The winner is ";
  var winText2 = "!!!";
  var drawText = "It's a draw!";

  var pickedList = [[],[]];
  var boxes = document.getElementsByTagName("td");
  var reset = document.getElementById("reset");

  for(var box of boxes){
    box.className = "available";

    box.addEventListener("click",function(){
      if(this.classList.contains("available")){
        this.className = "";
        this.innerHTML = turnChar[turn];
        pickedList[turn].push(this.dataset.num);
        if(hasWon()){
          playerTurn.innerHTML = winText1 + turnChar[turn] + winText2;
          for(var box of boxes){
            box.className = "";
          }
        }
        else if(pickedList[0].length+pickedList[1].length == 9){
          playerTurn.innerHTML = drawText;
        }
        else{
          turn = (turn+1)%2;
          playerTurn.innerHTML = turnText[turn];
          console.log(pickedList);
        }
      }
    });
  }

  reset.addEventListener("click",function(){
    turn = 1;
    playerTurn.innerHTML = turnText[1];
    pickedList = [[],[]];
    for(var box of boxes){
      box.innerHTML = "";
      box.className = "available";
    }
  });

  var winPoss =  [[0,1,2],
                  [3,4,5],
                  [6,7,8],
                  [0,3,6],
                  [1,4,7],
                  [2,5,8],
                  [0,4,8],
                  [2,4,6]];

  function hasWon(){
    var hasWon = false;
    for(let poss of winPoss){
      let found = 0;
      for(let playerChoice of pickedList[turn]){
        for(let possChoice of poss){
          console.log(possChoice + " " + playerChoice);
          if(playerChoice==possChoice){
            found += 1;
            break;
          }
        }
      }
      if(found>=3){
        return true;
      }
    }
    return false;
  }

};
