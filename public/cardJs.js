//Javascript stuff

//TODO: 
//-Add a delay at the start of the game that shows the images on the screen for a few seconds that way the player will be able to memorize their positions
//-Make it so that when you mess up a flip it just flips the cards back and doesnt end the game
//-Make a proper win condition instead of the nothing there is currently
//Clean up useless commented code (The stuff in the startGame function for ex)
//Better card cover
//Some of this is pretty spaghetti. Can probably be refactored (The visible/hidden stuff is all over the place)
//Better card cover/back
//Further improvements (scoreboard, database, ect)

//TESTING NOTE: if you want to test the game logic then you can not randomize the array (Comment line 47).

//Global game variables
let gameInSession = false;
let currentImage = null;

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

            imgArr = shuffle(imgArr);

            for(let x=0;x<imgArr.length;x++){
                let div = document.getElementById("gridDiv" + (x+1));
                let img = document.createElement("IMG");
                let cover = new Image(100,100);

                img.src = imgArr[x].src;
                img.id = 'img' + x;
                img.className = 'Img-thumbnail';
                img.style.visibility = 'hidden';
                img.style.position = 'relative';

                cover.onclick = ()=>pictureClicked(img,cover);
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
    //Make images visible
    for(let x=0;x<16;x++){
        //let img = document.getElementById('gridDiv' + (x+1)).childNodes[2];
        let cover = document.getElementById('gridDiv' + (x+1)).childNodes[1];
        if(cover.style.visibility === 'visible'){
            //img.style.visibility = 'hidden';
            cover.style.visibility = 'hidden';
        }else{
            //img.style.visibility = 'visible';
            cover.style.visibility = 'visible';
        }   
    }
    //Disable start game button during the game
    let gamebutton = document.getElementById('startbutton');
    gamebutton.disabled = true;
}

//Called when an image is clicked. The game is 'played' in this function.
function pictureClicked(img,cover){
    cover.style.visibility = 'hidden';
    img.style.visibility = 'visible';

    if(currentImage == null){
        currentImage = img;
    }else{
        if(currentImage.src != img.src){
            alert("You Lose");
            location.reload();
        }else{
            currentImage = null; 
        }
    }
}