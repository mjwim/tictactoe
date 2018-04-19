// MESSAGES

const gameOverMessage = 'Game over, would you like to play again? [Y/N]';

const instructionsMessage = `
===============================================================================
                        RULES FOR TIC-TAC-TOE
===============================================================================

1. The game is played on a grid that's 3 squares by 3 squares.

2. You are X (or another chracter of your choice), your friend (or the computer)
   is O (or another chracter of their choice). Players take turns putting their
   marks in empty squares, by entering the reference of the square you/they choose
   when it is your/their turn.

3. The first player to get 3 of there marks in a row (up, down, across, or
   diagonally) is the winner.

4. When all 9 squares are full, the game is over. If no player has 3 marks in a
row, the game ends in a tie.
===============================================================================
                             THE BOARD
===============================================================================

The board, with each square reference labelled is as follows;

 0 | 1 | 2
===+===+===
 3 | 4 | 5
===+===+===
 6 | 7 | 8

===============================================================================
                              HAPPY GAMING!!!
===============================================================================
`;

// Computer Winning/Blocking patterns

const winningMoves = [[(/ OO....../),0],[(/O..O.. ../),6], [(/......OO /),8],[(/.. ..O..O/),2], [(/ ..O..O../),0],[(/...... OO/),6], [(/..O..O.. /),8],[(/OO ....../),2], [(/ ...O...O/),0],[(/..O.O. ../),6], [(/O...O... /),8],[(/.. .O.O../),2], [(/O O....../),1],[(/O.. ..O../),3], [(/......O O/),7],[(/..O.. ..O/),5], [(/. ..O..O./),1],[(/... OO.../),3], [(/.O..O.. ./),7],[(/...OO .../),5]];

const blockingMoves = [[(/ {2}X . X {2}/),1],[(/ XX....../),0],[(/X..X.. ../),6], [(/......XX /),8],[(/.. ..X..X/),2],[(/ ..X..X../),0], [(/...... XX/),6],[(/..X..X.. /),8],[(/XX ....../),2], [(/ ...X...X/),0],[(/..X.X. ../),6],[(/X...X... /),8], [(/.. .X.X../),2],[(/X X....../),1],[(/X.. ..X../),3], [(/......X X/),7],[(/..X.. ..X/),5],[(/. ..X..X./),1], [(/... XX.../),3],[(/.X..X.. ./),7],[(/...XX .../),5], [(/ X X.. ../),0],[(/ ..X.. X /),6],[(/.. ..X X /),8], [(/ X ..X.. /),2],[(/ {2}XX.. ../),0],[(/X.. .. X /),6], [(/.. .XX {3}/),8],[(/X {2}..X.. /),2],[(/ X {2}..X../),0], [(/ ..X.. {2}X/),6],[(/..X.. {2}X /),8],[(/X {2}..X.. /),2]];

const winningPatterns = [[(/OOO....../),'O'], [(/...OOO.../),'O'], [(/......OOO/),'O'], [(/O..O..O../),'O'], [(/.O..O..O./),'O'], [(/..O..O..O/),'O'], [(/O...O...O/),'O'], [(/..O.O.O../),'O'], [(/XXX....../),'X'], [(/...XXX.../),'X'], [(/......XXX/),'X'], [(/X..X..X../),'X'], [(/.X..X..X./),'X'], [(/..X..X..X/),'X'], [(/X...X...X/),'X'], [(/..X.X.X../),'X']];

const board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
const X = 'X';
const O = 'O';
const players = [X, O];
let currTurn = X;

const computerTurn = function() {
  // computer is checking for a winning move
  let computersMove  = computerCheckForMoves(winningMoves);
  if(computersMove === -1){
  // computer is checking for a blocking move
    computersMove = computerCheckForMoves(blockingMoves);
    if(computersMove === -1) {
      // if neither a winning or blocking move available, the choice is made by the getMove function
      computersMove = getMove();
    }
  }
  move(computersMove, O);
};

const move = function(squareChosen, currentPlayer) {
  console.log('SQUARE CHOSEN', +squareChosen);
  if(currentPlayer !== currTurn) {
    return false;
  }

  if(+squareChosen>=0 && +squareChosen<=8 &&! isNaN(+squareChosen) && board[+squareChosen] === ' ') {
    board.splice(+squareChosen, 1, currentPlayer);
    currTurn = (currentPlayer === X) ? O : X;
    const nextPlayer = (currentPlayer === X) ? X : O;
    play(nextPlayer);
    return true;
  }
  error();
  return false;
};

const error = function() {
  console.log(errorMessage);
};

const errorMessage = 'That square has been picked already! Choose another';

const boardDisplay = function() {
  return ' '+board[0]+' |'+' '+board[1]+' |'+' '+board[2]+'\n===+===+===\n'+' '+board[3]+' |'+' '+board[4]+' |'+' '+board[5]+'\n===+===+===\n'+' '+board[6]+' |'+' '+board[7]+' |'+' '+board[8];
};

const showBoard = function() {
  console.log(boardDisplay());
};

const welcomeMessage = function() {
  console.log('Welcome to Tic Tac Toe, an interactive game brought to you by Command Line Games, Inc.');
};

const helpPrompt = function() {
  console.log('Would you like to know how to play? [Y/N]');
};

const gameTypeSelect = function() {
  console.log('Would you like to play 1 or 2 player? [1/2]');
};

const difficultySelect = function() {
  console.log('Would you like to play Easy, Medium or Hard mode? [E/M/H]');
};

const characterSelect = function() {
  console.log('What character would you like to play as? Choose any key.');
};

const boardFilled = function(){
  const x = getMove();
  if( x === -1) {
    showBoard();
    gameOver();
    return true;
  }
  return false;
};

const gameOver = function() {
  console.log(gameOverMessage);
};

const instructions = function() {
  console.log(instructionsMessage);
};

const winner= function(){
  const boardString= board.join('');
  let theWinner = null;
  for (let i = 0; i<winningPatterns.length; i++){
    const array= boardString.match(winningPatterns[i][0]);
    if(array) {
      theWinner = winningPatterns[i][1];
    }
  }
  if(theWinner){
    showBoard();
    console.log('WE HAVE A WINNER!!!!');
    gameOver();
    return true;
  }
  return false;
};

const computerCheckForMoves = function(pattern){
  const boardString = stringifyBoard();
  for (let i = 0; i<pattern.length; i++){
    const array= boardString.match(pattern[i][0]);
    if(array) {
      return pattern[i][1];
    }
  }
  return -1;
};

const stringifyBoard = function() {
  return board.join('');
};

const getMove = function(){
  if(board[4] === ' ') {
    // returns 4 as this is middle square. Computer will always choose this if it is available
    return 4;
  }
  // otherwise it will pick the first available square
  return board.indexOf(' ');
};

const exit = function() {
  process.exit();
};

const play = function(player) {
  console.log(`Player ${player} turn. Choose your square. Enter [0-8]:`);
};

const convertPlayerInputToInteger = function(input) {
  return +input;
};

const gameStart = function(){
  welcomeMessage();
  helpPrompt();
  gameTypeSelect();
  difficultySelect();
  characterSelect();
  instructions();
  showBoard();

  play(X);

  process.openStdin().on('data',function(res) {
    const playerInput = convertPlayerInputToInteger(res);
    if(move(playerInput, X)){
      if(winner() || boardFilled()) {
        exit();
      } else {
        computerTurn();
        if (winner() || boardFilled()) {
          exit();
        } else {
          showBoard();
        }
      }
    }
  });
};

gameStart();
