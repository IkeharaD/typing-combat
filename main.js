const playerSelector=document.getElementById('player-selector');
const playerDescription=document.getElementById('player-description');
const startDiv=document.getElementById('start');
const gameDiv=document.getElementById('game');
const playerImg=document.getElementById('player');
const effectImg=document.getElementById('effect');
const enemyImg=document.getElementById('enemy');
const playerHpParagraph=document.getElementById('player-hp');
const enemyHpParagraph=document.getElementById('enemy-hp');
const enemyEffectImg=document.getElementById('enemy-effect');


let effectPos=0,playerHp=100,enemyHp=100,enemyEffectPos=0;


const playerDatas=[
    {
        name:"炎の魔術師",
        description:"炎を操る魔法使い。",
        dataName:"fire"
    },
    {
        name:"水の魔術師",
        description:"水を操る魔法使い。",
        dataName:"water"
    },
    {
        name:"風の魔術師",
        description:"風を操る魔法使い。",
        dataName:"air"
    },
    {
        name:"土の戦士",
        description:"土の力を操る戦士。斧は飾り。",
        dataName:"dirt"
    },
    {
        name:"闇の魔術師",
        description:"闇の力を持つ魔法使い。",
        dataName:"darkness"
    }
];

let data=playerDatas[0];

let game={
    words:[
        'red',
        'green',
        'blue',
        'yellow',
        'cyan',
        'magenta',
        'black',
        'white',
        'fire',
        'water',
        'air',
        'darkness',
        'magic',
        'battle',
        'fight'
    ],
    currentWord:'',
    matchedIndex:0,
    startTime:null,
    isPlaying:false,
    mainArea:document.getElementById('main'),
    resultArea:document.getElementById('result'),
    start:function(){
        game.isPlaying=true;
        game.startTime=Date.now();
        startDiv.innerHTML='';
        game.setWord();
        game.displayGame();
    },
    setWord:function(){
        if(this.isPlaying){
            const rand=Math.floor(Math.random()*game.words.length);
            game.currentWord=game.words[rand];
            game.matchedIndex=0;
            game.displayWord();
        }
    },
    displayWord:function(){
        game.mainArea.innerHTML='_'.repeat(game.matchedIndex)+game.currentWord.substring(game.matchedIndex);
    },
    isFinished:function(){
        return enemyHp<=0||playerHp<=0;
    },
    displayResult:function(){
        const currentTime=Date.now();
        const elapsedTime=formattedSeconds(currentTime-game.startTime);
        if(enemyHp<=0){
            game.resultArea.innerText=`${elapsedTime}秒かけてゴブリンを倒した。\nもう一度プレイする場合にはブラウザをリロードしてください。`;
        }else{
            game.resultArea.innerText=`${elapsedTime}秒で負けてしまった。\nもう一度プレイする場合にはブラウザをリロードしてください。`;
        }
        game.isPlaying=false;
    },
    displayGame:function(){
        gameDiv.style.display='block';
        playerImg.setAttribute('src',`player_${data.dataName}.png`);
        effectImg.setAttribute('src',`effect_${data.dataName}.png`);
    }
};


document.getElementById('start-button').onclick=()=>{
    if(game.isPlaying===false){
        game.start();
    }
}

document.onkeydown=e=>{
    if(game.isPlaying)
        if(e.key==game.currentWord[game.matchedIndex]){
            game.matchedIndex++;
            game.displayWord();

            if(game.matchedIndex==game.currentWord.length){
                effectPos=0;
                effectImg.style.display='block';
                animateEffect();
                game.setWord();
            }
        }else{
            console.log(enemyEffectImg.style.display);
            if(enemyEffectImg.style.display=='none'){
                enemyEffectImg.style.display='block';
                enemyEffectPos=0;
                animateEnemyEffect();
            }
        }
}


function formattedSeconds(ms){
    return (ms/1000).toFixed(2);
}

function animateEffect(){
    effectPos+=5;
    effectImg.style.left=`${effectPos}%`;
    if(effectPos<100)
        setTimeout(animateEffect,33);
    else{
        onattack();
        effectImg.style.display='none';
    }
}

function animateEnemyEffect(){
    enemyEffectPos+=5;
    enemyEffectImg.style.right=`${enemyEffectPos}%`;
    if(enemyEffectPos<100)
        setTimeout(animateEnemyEffect,33);
    else{
        onattacked();
        enemyEffectImg.style.display='none';
    }
}

function onattack(){
    enemyHp-=10;
    enemyHpParagraph.innerText=enemyHp;
    if(game.isFinished()){
        game.mainArea.innerText='';
        game.displayResult();
    }
}

function onattacked(){
    playerHp-=10;
    playerHpParagraph.innerText=playerHp;
    if(game.isFinished()){
        game.mainArea.innerText='';
        game.displayResult();
    }
}

for(let i=0;i<playerDatas.length;i++){
    const radio=document.createElement('input');
    //id,type,className,name
    radio.className='player-select-radio';
    radio.id=i;
    radio.setAttribute('type','radio');
    radio.setAttribute('name','player-select');
    const label=document.createElement('label');
    //for,class src,class
    label.setAttribute('for',i);
    label.className='player-select-label';
    const img=document.createElement('img');
    img.setAttribute('src',`player_${playerDatas[i].dataName}.png`);
    img.className='player-select-img';

    label.onclick=()=>{
        data=playerDatas[i];
        playerDescription.innerHTML=`<h3>${data.name}</h3><p>${data.description}</p>`;
    }

    label.appendChild(img);

    playerSelector.appendChild(radio);
    playerSelector.appendChild(label);
}