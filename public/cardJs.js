//Javascript stuff

//Global game variables
let gameInSession = false;


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
            for(let x=0;x<res.length;x++){
                let newimg = new Image(100,100);
                newimg.src = 'images/' + res[x];
                imgArr.push(newimg,newimg);
            }

            imgArr = shuffle(imgArr);

            for(let x=0;x<imgArr.length;x++){
                let div = document.getElementById("gridDiv" + (x+1));
                let img = document.createElement("IMG");
                img.src = imgArr[x].src;
                img.className = 'Img-thumbnail';
                img.style.visibility = 'hidden';
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
        let img = document.getElementById("gridDiv" + (x+1)).childNodes[1];
        if(img.style.visibility === 'visible'){
            img.style.visibility = 'hidden';
        }else{
            img.style.visibility = 'visible';
        }   
    }
    //Disable start game button during the game
    let gamebutton = document.getElementById('startbutton');
    gamebutton.disabled = true;
}