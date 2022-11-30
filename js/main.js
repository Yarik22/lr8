const type={
    name:['Diluc','Eula','Zhongli'],
    size:['150px','220px','280px'],
    url:['img/diluc.png','img/eula.png','img/zhongli.png'],
}
let victories=0
let loses=0
let gameCount=0
let botPoints=0
let playerPoints=0
let roundCount=0
let nickname
let character=''
const chooseCharacter=document.body.querySelector('.choose')
const characters=document.body.querySelector('.characters')
const battleField=document.body.querySelector('.battle__field')
const reset=document.querySelectorAll('button')[1]
const player=battleField.querySelector('img')
const points=document.body.querySelector('.points')
const result=document.body.querySelector('.result')
const currentPoints=document.body.querySelector('.current_points')

reset.remove()
document.body.removeChild(battleField)

function choose() {
    character=event.target
    player.src=character.src
    for(el of type.name){
        if(el==character.alt){
            player.style.width=type.size[type.name.indexOf(el)]
            break;
        }
    }
    document.body.removeChild(chooseCharacter)
    document.body.removeChild(characters)
    document.body.appendChild(battleField)
    document.body.appendChild(reset)
}

function restart(){
    document.body.appendChild(chooseCharacter)
    document.body.appendChild(characters)
    reset.remove()
    document.body.removeChild(battleField)
    botPoints=0
    playerPoints=0
    roundCount=0
    gameCount=0
    victories=0
    loses=0
    currentPoints.previousSibling.textContent=''
    result.firstElementChild.textContent=''
    currentPoints.textContent=``
}

function dice() {
    const diceArr=[Math.ceil(Math.random()*6),Math.ceil(Math.random()*6)]
    if (diceArr[0]>diceArr[1]) {
        result.firstElementChild.style='color:green'
        result.firstElementChild.textContent='Win'
        playerPoints+=1
        roundCount++
    }else if(diceArr[1]==diceArr[0]){
        dice()
        return
    }else{
        result.firstElementChild.style='color:red'
        result.firstElementChild.textContent='Lose'
        botPoints+=1
        roundCount++
    }
    currentPoints.previousSibling.textContent=`Games:${gameCount}(W:${victories}.L:${loses}).Rounds:${roundCount}`
    currentPoints.textContent=`${diceArr[0]}:${diceArr[1]}`
    if(botPoints>=3){
        result.firstElementChild.style='color:red'
        result.firstElementChild.textContent='You lost the game'
        botPoints=0
        playerPoints=0
        gameCount++
        roundCount=0
        loses++
    }
    if(playerPoints>=3){
        result.firstElementChild.style='color:green'
        result.firstElementChild.textContent='You win the game'
        playerPoints=0
        botPoints=0
        gameCount++
        roundCount=0
        victories++
    }
}
setTimeout(() => {
    nickname=prompt(`Input your nickname`)
    while(nickname==null||nickname.trim()=='')
    {
        nickname=prompt(`Input your nickname correctly`)
    }
    player.nextSibling.textContent=nickname
}, 20);

