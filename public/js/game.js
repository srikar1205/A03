
/**
 * Simple tic-tac-toe game example. 
 */
const game = (function (window) {

  const cellElements = [
    document.getElementById('upper-left'),
    document.getElementById('upper-mid'),
    document.getElementById('upper-right'),
    document.getElementById('center-left'),
    document.getElementById('center-mid'),
    document.getElementById('center-right'),
    document.getElementById('lower-left'),
    document.getElementById('lower-mid'),
    document.getElementById('lower-right')
  ];
  
  let cells = []
  cells[8] = undefined

  for (let i = 0; i < cellElements.length; i++) {
    if(cellElements[i]){

      cellElements[i].addEventListener('click', async function () {
        
        // add player's X
        const isValidMove = await addX(cellElements[i]);
        cells[i] = 'X'
        let s = analyzeGame()
        
        if(s){
          let winner = s.includes('X') ? 'X' : 'O'
          setTimeout(function(){ 
            alert(winner)
            window.location.reload()
          }, 1)
        }
        
        if (isValidMove) {
          
          // choose computer's 0
          const j = await findBestMove(cellElements);
          
          // pause, then add computer's 0
          await new Promise((resolve) => setTimeout(() => resolve(), 2));
          await addO(cellElements[j]);
          cells[j] = 'O'
          s = analyzeGame()
          if(s){
            let winner = s.includes('X') ? 'X' : 'O'
            setTimeout(function(){
              alert(winner) 
              window.location.reload()
            }, 1)
          }
        }
        
      });
    }
  }

  window.analyzeGame = analyzeGame
  function analyzeGame () {
    let cellElements2D;
    if(arguments[0].length){
      cellElements2D = arguments[0]
    }else{
      cellElements2D = [
        [cells[0],cells[1],cells[2]],
        [cells[3],cells[4],cells[5]],
        [cells[6],cells[7],cells[8]]
      ]
    }

    let prevElementdiagonal = ''
    let prevElementreversediagonal = ''
    let prevElementdiagonalcount = 0
    let prevElementreversediagonalcount = 0
    for(let i = 0;i <= 2;i++){

      let count = 0

      for(let j = 1 ; j <= 2; j++){
        if(cellElements2D[i][j] && cellElements2D[i][j] === cellElements2D[i][j-1]){
          count += 1
        }
      }
      if(count === 2 || prevElementdiagonalcount === 2 || prevElementreversediagonalcount === 2){
        return cellElements2D[i][i]
      }
      count = 0

      for(let j = 1 ; j <= 2; j++){
        if(cellElements2D[j][i] && cellElements2D[j][i] === cellElements2D[j-1][i]){
          count += 1
        }
      }

      if(prevElementdiagonal === cellElements2D[i][i] && cellElements2D[i][i]){
        prevElementdiagonalcount += 1
      }
      prevElementdiagonal = cellElements2D[i][i]

      if(prevElementreversediagonal === cellElements2D[i][2-i] && cellElements2D[i][2-i]){
        prevElementreversediagonalcount += 1
      }
      prevElementreversediagonal = cellElements2D[i][2-i]

      if(count === 2 || prevElementdiagonalcount === 2 || prevElementreversediagonalcount === 2){
        return cellElements2D[i][i]
      }
    }



    return false
  }

  async function findBestMove(arr) {
    for (let n = 0; n < arr.length; n++) {
      if (arr[n].childElementCount === 0) {
        return n;
      }
    }
  }

  async function addX(cellElement) {
    if (cellElement.childElementCount === 1) { return false; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("X");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
    return true;
  }

  async function addO(cellElement) {
    if (cellElement.childElementCount === 1) { return; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("0");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
  }

})(window);