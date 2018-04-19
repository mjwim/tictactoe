const pattern1 = [[(/ OO....../),0],[(/O..O.. ../),6], [(/......OO /),8],[(/.. ..O..O/),2], [(/ ..O..O../),0],[(/...... OO/),6], [(/..O..O.. /),8],[(/OO ....../),2], [(/ ...O...O/),0],[(/..O.O. ../),6], [(/O...O... /),8],[(/.. .O.O../),2], [(/O O....../),1],[(/O.. ..O../),3], [(/......O O/),7],[(/..O.. ..O/),5], [(/. ..O..O./),1],[(/... OO.../),3], [(/.O..O.. ./),7],[(/...OO .../),5]];

const pattern2 = [[(/  X . X  /),1],[(/ XX....../),0],[(/X..X.. ../),6], [(/......XX /),8],[(/.. ..X..X/),2],[(/ ..X..X../),0], [(/...... XX/),6],[(/..X..X.. /),8],[(/XX ....../),2], [(/ ...X...X/),0],[(/..X.X. ../),6],[(/X...X... /),8], [(/.. .X.X../),2],[(/X X....../),1],[(/X.. ..X../),3], [(/......X X/),7],[(/..X.. ..X/),5],[(/. ..X..X./),1], [(/... XX.../),3],[(/.X..X.. ./),7],[(/...XX .../),5], [(/ X X.. ../),0],[(/ ..X.. X /),6],[(/.. ..X X /),8], [(/ X ..X.. /),2],[(/  XX.. ../),0],[(/X.. .. X /),6], [(/.. .XX   /),8],[(/X  ..X.. /),2],[(/ X  ..X../),0], [(/ ..X..  X/),6],[(/..X..  X /),8],[(/X  ..X.. /),2]];

const pattern3 = [[(/OOO....../),'O'], [(/...OOO.../),'O'], [(/......OOO/),'O'], [(/O..O..O../),'O'], [(/.O..O..O./),'O'], [(/..O..O..O/),'O'], [(/O...O...O/),'O'], [(/..O.O.O../),'O'], [(/XXX....../),'X'], [(/...XXX.../),'X'], [(/......XXX/),'X'], [(/X..X..X../),'X'], [(/.X..X..X./),'X'], [(/..X..X..X/),'X'], [(/X...X...X/),'X'], [(/..X.X.X../),'X']];

const board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
const X = 'X';
const O = 'O';
const players = [X, O];
let currTurn = X;

const comp = function() {
  let x  = getPattern1Move();
  if(x === -1){
    x = getPattern2Move();
    if(x === -1) {
      x = getMove();
    }
  }
  move( x, O );
};

const move = function(pos,x) {

  if(x !== currTurn) {
    return false;
  }

  if(+pos>=0 && +pos<=8 &&! isNaN(+pos) && board[+pos] === ' ') {
    board.splice(+pos,1,x);
    currTurn = (x === X) ? O : X;
    return true;
  }
  return false;
};

const boardDisplay = function() {
  return ' '+board[0]+' |'+' '+board[1]+' |'+' '+board[2]+'\n===+===+===\n'+' '+board[3]+' |'+' '+board[4]+' |'+' '+board[5]+'\n===+===+===\n'+' '+board[6]+' |'+' '+board[7]+' |'+' '+board[8];
};

const show = function() {
  console.log(boardDisplay());
};

const boardFilled = function(){
  const x = getMove();
  if( x === -1) {
    show();
    console.log('Game over');
    return true;
  }
  return false;
};

const winner= function(){
  const boardString= board.join('');
  let theWinner = null;
  for (let i = 0; i<pattern3.length; i++){
    const array= boardString.match(pattern3[i][0]);
    if(array) {
      theWinner = pattern3[i][1];
    }
  }
  if(theWinner){
    show();
    console.log('Game over');
    return true;
  }
  return false;
};

const getPattern1Move= function(){
  const boardString= board.join('');
  for (let i = 0; i<pattern1.length; i++){
    const array= boardString.match(pattern1[i][0]);
    if(array) {
      return pattern1[i][1];
    }
  }
  return -1;
};

const getPattern2Move= function(){
  const boardString= board.join('');
  for (let i = 0; i < pattern2.length; i++) {
    const array = boardString.match(pattern2[i][0]);
    if(array) {
      return pattern2[i][1];
    }
  }
  return -1;
};

const getMove = function(){
  if(board[4] === ' ') {
    return 4;
  }
  return board.indexOf(' ');
};

const exit = function() {
  process.exit();
};

const play = function(){
  show();
  console.log('Enter [0-8]:');
  process.openStdin().on('data',function(res){
    if(move(res, X)){
      if(winner()||boardFilled()) {
        exit();
      } else {
        comp();
        if (winner() || boardFilled()) {
          exit();
        } else {
          show();
        }
      }
    }
  });
};

play();
