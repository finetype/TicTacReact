var game = [[4,4,4],[4,4,4],[4,4,4]]

$(document).ready(function() {

  var turn = "X";
  $("#turn-header").html("Turn: " + turn);

  $('td').click(function(event){
    if ($(event.target).html() === "") {
      
      $(event.target).html(turn);
      
      var x = event.target.id[1];
      var y = event.target.id[2];  

      game[x][y] = turn === "X" ? 1 : 0;

      turn = turn === "X" ? "O" : "X";

      if ( isWinner() ) {
        clearBoard();
      }
      else {
        $("#turn-header").html("Turn: " + turn);
      }
    }

  });

  function colorize (a,b,c) {
    console.log(a,b,c)
    $(a).css('background-color','red');
    $(b).css('background-color','red');
    $(c).css('background-color','red');
  };

  function isWinner () {
    console.log("checking for winner,", game);
    for (var i = 0; i < 3; i++) {
      // Check all collumns:
      var col = [ game[0][i], game[1][i], game[2][i] ].reduce((a,b) => a + b);
      if (col === 0 || col === 3) {
        colorize( ("#b"+0+i), ("#b"+1+i), ("#b"+2+i) );
        alert("Winner is " + (col === 0 ? "O" : "X") + " on col " + (i+1) );
        return true;
      }
      
      // Check all rows:
      var row = [ game[i][0], game[i][1], game[i][2] ].reduce((a,b) => a + b);
      if (row === 0 || row === 3) {
        colorize( ("#b"+i+0), ("#b"+i+1), ("#b"+i+2) );
        alert("Winner is " + (row === 0 ? "O" : "X") + " on row " + (i+1) );
        return true;
      }
    }

    // Check diagonals
    var diag1 = [ game[0][0], game[1][1], game[2][2] ].reduce((a,b) => a + b);
    if (diag1 === 0 || diag1 === 3) {
      colorize( ("#b00"), ("#b11"), ("#b22") );
      alert("Winner is " + (diag1 === 0 ? "O" : "X") + " on diagonal from top left ");
      return true
    }

    var diag2 = [ game[0][2], game[1][1], game[2][0] ].reduce((a,b) => a + b);
    if (diag2 === 0 || diag2 === 3) {
      colorize( ("#b02"), ("#b11"), ("#b20") );
      alert("Winner is " + (diag2 === 0 ? "O" : "X") + " on diagonal from top right");
      return true
    }

    return false;
  };

  function clearBoard () {
    game = [[4,4,4],[4,4,4],[4,4,4]];
    for (var i = 0; i < 3; i++) {
      $("#b" + 0 + i).html('').css('background-color','black');
      $("#b" + 1 + i).html('').css('background-color','black');
      $("#b" + 2 + i).html('').css('background-color','black');
    }
  };

});
