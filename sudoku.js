var selectedTile;
var selectedNumber;

var initialBoard = [
    "---9--427",
    "24--879-5",
    "-912-----",
    "---72-34-",
    "----4---1",
    "3--------",
    "-8647----",
    "-----25--",
    "-1--38-6-"
];

var solution = [
    "865913427",
    "243687915",
    "791254683",
    "158726349",
    "629345871",
    "374891256",
    "586479132",
    "437162598",
    "912538764"
];

//funkcja wywoływana przy ładowaniu strony
window.onload = function(){
    initGame();
}

//inicjalizacja planszy
function initGame(){
    //init grid
    for(let i=1; i<=9; i++){
        for(let j=1; j<=9; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            //add borders depends on tile position
            if (i%3==1) tile.classList.add("top_border_2px");
            else tile.classList.add("top_border_1px");
            if(i==9) tile.classList.add("bottom_border_2px");
            if (j%3==1) tile.classList.add("left_border_2px");
            else tile.classList.add("left_border_1px");
            if(j==9) tile.classList.add("right_border_2px");
            if (initialBoard[i-1][j-1]!="-"){
                tile.innerText = initialBoard[i-1][j-1];
                tile.classList.add("default_tile");
            }else{
                tile.classList.add("user_tile");
            }
                
            document.getElementById("board").append(tile); 
            tile.addEventListener("click", clickOnTile);
        }
    }

    //init panel numbers
    for(let i=1; i<=9; i++){
        let number = document.createElement("div");
        number.id = i.toString();
        number.innerText = i;
        number.classList.add("number");
        
        document.getElementById("panel").append(number);
        number.addEventListener("click", clickOnNumber);
    }

    //init check solution button
    let checkSolution = document.createElement("div");
    checkSolution.id = "check";
    checkSolution.innerText = "Check";
    checkSolution.classList.add("check_solution");
    document.getElementById("panel").append(checkSolution);
    checkSolution.addEventListener("click", isCorrect)
}

//click on grid
function clickOnTile(){
    if(selectedTile != null){
        selectedTile.classList.remove("selectedTile");
        if(selectedTile.id == this.id){
            selectedTile = null;
            return;
        }
        
    }

    selectedTile = this;
    this.classList.add("selectedTile");
}

//click on number on panel
function clickOnNumber(){
        
    selectedNumber = this;

    let coords = selectedTile.id.split("-"); //wybieramy z id współrzędne
    
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    //alert(coords[0]+" "+coords[1]+" "+initialBoard[r-1][c-1]);

    if(selectedTile!=null && initialBoard[r-1][c-1]=="-"){
        selectedTile.innerText = selectedNumber.innerText;
    }
}

//checking if user solution is correct
function isCorrect(){
    let isOk = true;
    for(let i=1; i<=9; i++){
        for(let j=1; j<=9; j++){
            let tileId = i.toString() + "-" + j.toString();
            let tile = document.getElementById(tileId);
            if(tile.innerText!=solution[i-1][j-1]){
                alert("This is not correct.");
                isOk = false; break;
            }
        }
        if(!isOk) break;
    }
    if(isOk) alert("Solution is correct.");
}
