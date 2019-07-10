var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var startGameBool = true;

bindEvent();
function bindEvent() {
    startBtn.onclick = function () {
        if (startGameBool) {
            box.style.display = 'block';   /*点击开始按钮之后，小格子显示*/
            flagBox.style.display = 'block';
            init();
            startGameBool = false;
        }

    }
    box.oncontextmenu = function(){
        return false;
    }
    box.onmousedown = function(e){
        var event = e.target;   /*判断点击的是哪个小格*/
        if(e.which == 1){       /*判断是左右键*/
            leftClick(event);
        }else if(e.which == 3){
            rightClick(event);
        }
    }
    closeBtn.onclick = function(){
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        startGameBool = true;
    }
}
function init(){
     minesNum  = 10;
     mineOver  = 10;
      score.innerHTML = mineOver;
    for(i = 0;i < 10; i ++){
        for(j = 0;j < 10;j ++){
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id',i + '-' + j);
            box.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    var block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            minesNum--;
        }

    }
   
}
function leftClick(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei = document.getElementsByClassName('isLei');  /*把是雷的元素取出*/
    if(dom && dom.classList.contains('isLei')){        /*当前dom元素存在，并且dom的className里面包含有isLei，则说明左点击到雷了*/
        //    console.log('gameOver');
           for(var i = 0;i < isLei.length;i ++){  /*游戏结束，让所有雷显示出来，先找出所有的雷，然后在给这些雷class加上show，show显示图片*/
               isLei[i].classList.add('show');
           }
    setTimeout(function(){
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("img/over.jpg")';
    },800)
    } else {                      /*需要标记一下旁边有几个雷 var n = 0计数*/
        var n = 0;
       var posArr = dom && dom.getAttribute('id').split('-');
       var posX = posArr && +posArr[0];
       var posY = posArr && +posArr[1];
       dom && dom.classList.add('num');
       for(var i = posX - 1;i <= posX + 1;i ++){
           for(var j = posY - 1; j <= posY+ 1;j++){
               var aroundBox = document.getElementById(i + '-' + j);
               if(aroundBox && aroundBox.classList.contains('isLei')){
                   n++;
               }
           }
       }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
    
}



function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
        mineOver --;
    }
     if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
        mineOver ++;
    }
    score.innerHTML = mineOver;
    if(mineOver == 0){
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("img/success.png")';
    }
}