//Javascript stuff

//TODO: 
//Display the tries left + score
//Better card cover/back
//Clean up useless commented code (The stuff in the startGame function for ex)
//Some of this is pretty spaghetti. Can probably be refactored (The visible/hidden stuff is all over the place)
//Further improvements (scoreboard, database, ect)

//TESTING NOTE: if you want to test the game logic then you can not randomize the array (Comment line 47).

//Global game variables
let gameInSession = false;
let currentImage = null;
let currentCover = null;
let cardIndex = 0;
let tries = 0;
let score = 0;
let maxPairs = 0;

//Array randomization
function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }  
    return array;
}

//Called onload to load the image tiles on the screen
//TODO make the images invisible to start
function loadImages(){
    let imgArr = [];

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(xhttp.response);
            
            for(let x=1;x<res.length;x++){
                let newimg = new Image(100,100);
                newimg.src = 'images/' + res[x];
                imgArr.push(newimg,newimg);
            }

            imgArr = shuffle(imgArr);//Comment this line for easy testing
            maxPairs = imgArr.length/2;

            for(let x=0;x<imgArr.length;x++){
                let div = document.getElementById("gridDiv" + (x+1));
                let img = document.createElement("IMG");
                let cover = new Image(100,100);

                img.src = imgArr[x].src;
                img.id = 'img' + x;
                img.className = 'Img-thumbnail';
                img.style.visibility = 'hidden';
                img.style.position = 'relative';

                cover.className = 'Img-thumbnail';
                cover.src = 'images/' + res[0];
                cover.id = 'cover' + x;
                cover.style.visibility = 'hidden';
                cover.style.position = 'absolute';
                
                div.appendChild(cover);
                div.appendChild(img);
            }
        }
    };
    xhttp.open("POST", "/getImageNames", true);
    xhttp.send();    
};

//Initialize game
function startGame(){
    //Disable start game button during the game
    let gamebutton = document.getElementById('startbutton');
    gamebutton.disabled = true;

    flipCards();
}

//Called when an image is clicked. The game is 'played' in this function.
function pictureClicked(img,cover){
    cover.style.visibility = 'hidden';
    img.style.visibility = 'visible';

    if(currentImage == null){
        currentImage = img;
        currentCover = cover;
    }else{
        if(currentImage.src != img.src){
            if(tries < 2){
                setTimeout(function(){ //if they got the wrong match, then hide the images and show the covers
                    currentCover.style.visibility = 'visible'; 
                    currentImage.style.visibility = 'hidden';
                    cover.style.visibility = 'visible';
                    img.style.visibility = 'hidden';
                    currentImage = null;
                    tries++;
                }, 1000)  //1 second timeout to show them the card that they flipped       
            } 
            else{
                alert("You Lose.");
                location.reload();
            }
        }else{
            score++;
            currentImage = null; 
            if(score == maxPairs){
                alert("You Win!");
                setTimeout(()=>location.reload(),500);
            }
        }
    }
}

//Adds event listeners to the cards after the initial card flip happens
function setOnClicks(){
    for(let x=0;x<maxPairs*2;x++){
        let cover = document.getElementById('cover' + x);
        let img = document.getElementById('img' + x);
        cover.onclick = ()=>pictureClicked(img,cover);
    }
}

function flipCards(){ //flips each card individually 
    
    if(cardIndex != 0){ 
        let prevImg = document.getElementById('gridDiv' + (cardIndex)).childNodes[2];
        prevImg.style.visibility = 'hidden';
    }
    if(cardIndex == 16){
        setOnClicks();
        return;
    }

    for (let i = 0; i < 16; i++){
        let cover = document.getElementById('gridDiv' + (i+1)).childNodes[1];
        cover.style.visibility = 'visible';   
    }
      
    img = document.getElementById('gridDiv' + (cardIndex + 1)).childNodes[2];
    img.style.visibility = 'visible';
    cardIndex++;

    setTimeout(flipCards, 750);
}