(function(){
  var Cell = React.createClass({
    handleClick: function(event) {
        var x         = this.props.xy[0];
        var y         = this.props.xy[1];
        var num       = this.props.game[x][y];
        var value     = cellDic[num];
        var turn      = this.props.turn;
      if (value.length === 0) {
        this.props.game[x][y] = cellDic[turn];
        this.props.toggleTurn();
        if (isWinner(this.props.game)){
          this.props.clearBoard();
        }
      }
    },
    render: function() {
      var x     = this.props.xy[0];
      var y     = this.props.xy[1];
      var num   = this.props.game[x][y];
      var value = cellDic[num];
      return (
        <td id={this.props.xy} onClick={this.handleClick}>{value}</td>
      )
    }
  });

  var Row = React.createClass({
    render: function() {
      var x          = this.props.x;
      var cells      = this.props.row.map((cell, y) => {
        return <Cell {...this.props} xy={"" + x + y} value={cellDic[cell]} key={"cell"+x+y}/>
      })
      return (
        <tr>
          {cells}
        </tr>
      );
    }
  });


  var Board = React.createClass({
    getInitialState: function() {
      return {game: [[0,0,0], [0,0,0], [0,0,0]]}
    },
    clearBoard: function() {
      this.setState({game:[[0,0,0], [0,0,0], [0,0,0]]})
    },
    render: function() {
      var rows = [];
      this.state.game.forEach((row, x) => {
        rows.push(
          <Row game={this.state.game} clearBoard={this.clearBoard} x={x} row={row} {...this.props} key={"row"+x}/>
          );
      });
      return (
        <table>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  });


  var Main = React.createClass({
    getInitialState: function() {
      return {turn: "X"}
    },
    toggleTurn: function() {
      this.setState({turn: this.state.turn === "X" ? "O" : "X"})
    },
    render: function() {
      return(
        <div>
          <h1>Turn: {this.state.turn}</h1>
          <Board toggleTurn={this.toggleTurn} turn={this.state.turn} />
        </div>
      )
    }
  });


  var cellDic = {
    '-1': "O",
    '1': "X",
    '0': "" ,
    "O": -1,
    "X": 1,
    "":  0
  }

  ReactDOM.render(
    <Main />,
    document.getElementById('SPA')
  );

  function isWinner(game) {
    for (var i = 0; i < 3; i++) {
      // Check all collumns:
      var col = [ game[0][i], game[1][i], game[2][i] ].reduce((a,b) => a + b);
      if (col === -3 || col === 3) {
        alert("Winner is " + (col === 3 ? "X" : "O") + " on col " + (i+1) );
        return true;
      }
      
      // Check all rows:
      var row = [ game[i][0], game[i][1], game[i][2] ].reduce((a,b) => a + b);
      if (row === -3 || row === 3) {
        alert("Winner is " + (row === 3 ? "X" : "O") + " on row " + (i+1) );
        return true;
      }
    }

    // Check diagonals
    var diag1 = [ game[0][0], game[1][1], game[2][2] ].reduce((a,b) => a + b);
    if (diag1 === -3 || diag1 === 3) {
      alert("Winner is " + (diag1 === 3 ? "X" : "O") + " on diagonal from top left ");
      return true;
    }

    var diag2 = [ game[0][2], game[1][1], game[2][0] ].reduce((a,b) => a + b);
    if (diag2 === -3 || diag2 === 3) {
      alert("Winner is " + (diag2 === 3 ? "X" : "O") + " on diagonal from top right");
      return true;
    }

    return false;
  };

}())
