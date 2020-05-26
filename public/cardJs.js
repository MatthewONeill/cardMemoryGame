//Javascript stuff

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

function loadImages(){
    let imgArr = [];

    //Loading images, will be replaced with server side POST request
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[0].src = 'images/feelsSpecialMan.png';
    imgArr[1].src = 'images/feelsSpecialMan.png';
    
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[2].src = 'images/feelsStrongMan.png';
    imgArr[3].src = 'images/feelsStrongMan.png';

    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[4].src = 'images/HYPERS.png';
    imgArr[5].src = 'images/HYPERS.png';

    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[6].src = 'images/peepoHappyLove.png';
    imgArr[7].src = 'images/peepoHappyLove.png';
    
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[8].src = 'images/peepoRip.png';
    imgArr[9].src = 'images/peepoRip.png';
    
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[10].src = 'images/pepeHands.png';
    imgArr[11].src = 'images/pepeHands.png';
    
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[12].src = 'images/peepoHug.png';
    imgArr[13].src = 'images/peepoHug.png';
    
    imgArr.push(new Image(100,100));
    imgArr.push(new Image(100,100));
    imgArr[14].src = 'images/pepeLaugh.png';
    imgArr[15].src = 'images/pepeLaugh.png';
    
    //Randomize
    imgArr = shuffle(imgArr);

    for(let x=0;x<imgArr.length;x++){
        let div = document.getElementById("gridDiv" + (x+1));
        let img = document.createElement("IMG");
        img.src = imgArr[x].src;
        //img.style.visibility = 'hidden';
        div.appendChild(img);
    }

    
};

