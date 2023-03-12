// game constants and variables
const direction={x:0,y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');
let speed=7;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food={x:6,y:7}
let score=0;
let inputDir={x:0,y:0};
// game functions
function main(ctime){
    window.requestAnimationFrame(main);// calling again and again
    //console.log(ctime); it will run too fast because frames per second are too fast
    // it will make our game go on its own 
    // how to reduce fps
    // ctime is running time we are just making it render every half second
    if((ctime-lastPaintTime)/1000<(1/speed))
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake)
{
    // if you bump into your self
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y==snake[0].y)
        {
            return true;
        }
    }
    // if you bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y<=0 || snake[0].y>=18)
    {
        return true;
    }
    return false;
}
function gameEngine(){
    // part1: Undating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    // if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        score++;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highscore.innerHTML="Hi Score: "+hiscoreval;
        }
        score.innerHTML="Score "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        let x1=Math.round(a+(b-a)*Math.random());
        let y1=Math.round(a+(b-a)*Math.random());
        food={x:x1,y:y1};
    }

    // moving the snake 

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};// for new object
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;



    // part2: Display the snake and food 
    // display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}






let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscore.innerHTML="Hi Score: "+hiscore;
}



// main logic starts here
window.requestAnimationFrame(main);// works same as settimeout and setinterval but in better way
// it will give you highest fps and won't flicker in between
window.addEventListener('keydown',e=>{
    intputDir={x:0,y:0}//start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})

