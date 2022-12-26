<script>
    import { gameStatus } from '../stores';
    import { charactersData } from '../stores';
    import { summonsData } from '../stores';

    let boardStatus;
    let characters;
    let summons;

    gameStatus.subscribe(value => {
		boardStatus = value;
	});

    charactersData.subscribe(value => {
		characters = value;
	});

    summonsData.subscribe(value => {
		summons = value;
	});

    //Characters ID
    const RINGO = 0, ADAGIO = 1, JOULE = 2;
    //Summons ID
    const GIFT_OF_FIRE = 0;

    function doDamageToEnemy(dmg){
        let newStatus = boardStatus;
        let enemyHP = boardStatus.enemy.characters[boardStatus.enemy.currentCharacter].hp;
        
        if(enemyHP - dmg < 0) {
            newStatus.enemy.characters[boardStatus.enemy.currentCharacter].hp = 0;
        }
        else newStatus.enemy.characters[boardStatus.enemy.currentCharacter].hp = enemyHP - dmg;
        gameStatus.update(status => newStatus);
    }

    function increaseEnergy() {
        let newStatus = boardStatus;
        let playerEnergy = boardStatus.player.characters[boardStatus.player.currentCharacter].energy;
        let maxEnergy = characters[boardStatus.player.currentCharacter].ultimateCost;
        if(playerEnergy + 1 <= maxEnergy) {
            newStatus.player.characters[boardStatus.player.currentCharacter].energy++;
        }
        gameStatus.update(status => newStatus);
    }

    function summon(summonID) {
        let newStatus = boardStatus;
		switch(summonID) {
            case GIFT_OF_FIRE:
                newStatus.player.summons.push(summons[summonID]);
                break;
        }
        gameStatus.update(status => newStatus);
	}

    function reduceEnergy(amount) {
        let newStatus = boardStatus;
        newStatus.player.characters[boardStatus.player.currentCharacter].energy -= amount;
        gameStatus.update(status => newStatus);
    }

    function shakeScreen() {
        document.getElementById("board").classList.add('shake');
        setTimeout(() => {
            document.getElementById("board").classList.remove('shake');
        }, 500);
    }

    function useSkill(skillIndex) {
        switch(boardStatus.player.currentCharacter){
            case RINGO:
                switch(skillIndex) { 
                    case 0: 
                        let audio1 = new Audio('assets/Sounds_01a_Ringo.mp3');
                        audio1.volume = 0.4;
                        audio1.play();
                        //Spawn bullet
                        setTimeout(() => { 
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet'><img src='assets/Sprites_01a_Ringo.png' /></div>";
                            let flashExtraY = 0;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(30deg)";
                                    flashExtraY = -2;
                                    break;
                                case 2:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(50deg)";
                                    flashExtraY = -2;
                                    break;
                            }
                            let bulletY = 0;
                            let bulletX = 0;
                            let bulletMover = setInterval(() => {
                                bulletY -= 0.75;
                                bulletX += 0.6;
                                document.getElementById("ringo-bullet").style.top = bulletY + "rem";
                                document.getElementById("ringo-bullet").style.left = bulletX * boardStatus.enemy.currentCharacter + "rem";
                            }, 10);
                            //on Impact
                            setTimeout(() => {
                                clearInterval(bulletMover);
                                let flashY = document.getElementById("ringo-bullet").style.top;
                                let flashX = document.getElementById("ringo-bullet").style.left;
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprites_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                document.getElementById("ringo-flash").style.top = parseFloat(flashY) + flashExtraY + "rem";
                                console.log(flashX);
                                document.getElementById("ringo-flash").style.left = flashX;
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                increaseEnergy();
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 50);
                            }, 250);
                        }, 100);
                        break;
                    case 1: 
                        let audio2 = new Audio('assets/Sounds_02a_Ringo.mp3');
                        audio2.volume = 0.5;
                        audio2.play();
                        //Spawn bullet 1
                        setTimeout(() => { 
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet'><img src='assets/Sprites_01a_Ringo.png' /></div>";
                            let flashExtraY = 0;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(30deg)";
                                    flashExtraY = -2;
                                    break;
                                case 2:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(50deg)";
                                    flashExtraY = -2;
                                    break;
                            }
                            let bulletY = 0;
                            let bulletX = 0;
                            let bulletMover = setInterval(() => {
                                bulletY -= 0.75;
                                bulletX += 0.6;
                                document.getElementById("ringo-bullet").style.top = bulletY + "rem";
                                document.getElementById("ringo-bullet").style.left = bulletX * boardStatus.enemy.currentCharacter + "rem";
                            }, 10);
                            //on Impact
                            setTimeout(() => {
                                clearInterval(bulletMover);
                                let flashY = document.getElementById("ringo-bullet").style.top;
                                let flashX = document.getElementById("ringo-bullet").style.left;
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprites_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                document.getElementById("ringo-flash").style.top = parseFloat(flashY) + flashExtraY + "rem";
                                console.log(flashX);
                                document.getElementById("ringo-flash").style.left = flashX;
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 50);
                            }, 250);
                        }, 400);
                        //Spawn bullet 2
                        setTimeout(() => { 
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet'><img src='assets/Sprites_01a_Ringo.png' /></div>";
                            let flashExtraY = 0;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(30deg)";
                                    flashExtraY = -2;
                                    break;
                                case 2:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(50deg)";
                                    flashExtraY = -2;
                                    break;
                            }
                            let bulletY = 0;
                            let bulletX = 0;
                            let bulletMover = setInterval(() => {
                                bulletY -= 0.75;
                                bulletX += 0.6;
                                document.getElementById("ringo-bullet").style.top = bulletY + "rem";
                                document.getElementById("ringo-bullet").style.left = bulletX * boardStatus.enemy.currentCharacter + "rem";
                            }, 10);
                            //on Impact
                            setTimeout(() => {
                                clearInterval(bulletMover);
                                let flashY = document.getElementById("ringo-bullet").style.top;
                                let flashX = document.getElementById("ringo-bullet").style.left;
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprites_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                document.getElementById("ringo-flash").style.top = parseFloat(flashY) + flashExtraY + "rem";
                                console.log(flashX);
                                document.getElementById("ringo-flash").style.left = flashX;
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 50);
                            }, 250);
                        }, 1000);
                        //Spawn bullet 3
                        setTimeout(() => { 
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet'><img src='assets/Sprites_01a_Ringo.png' /></div>";
                            let flashExtraY = 0;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(30deg)";
                                    flashExtraY = -2;
                                    break;
                                case 2:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(50deg)";
                                    flashExtraY = -2;
                                    break;
                            }
                            let bulletY = 0;
                            let bulletX = 0;
                            let bulletMover = setInterval(() => {
                                bulletY -= 0.75;
                                bulletX += 0.6;
                                document.getElementById("ringo-bullet").style.top = bulletY + "rem";
                                document.getElementById("ringo-bullet").style.left = bulletX * boardStatus.enemy.currentCharacter + "rem";
                            }, 10);
                            //on Impact
                            setTimeout(() => {
                                clearInterval(bulletMover);
                                let flashY = document.getElementById("ringo-bullet").style.top;
                                let flashX = document.getElementById("ringo-bullet").style.left;
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprites_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                document.getElementById("ringo-flash").style.top = parseFloat(flashY) + flashExtraY + "rem";
                                console.log(flashX);
                                document.getElementById("ringo-flash").style.left = flashX;
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 50);
                            }, 250);
                        }, 1800);
                        //Spawn bullet 4
                        setTimeout(() => { 
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet'><img src='assets/Sprites_01a_Ringo.png' /></div>";
                            let flashExtraY = 0;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(30deg)";
                                    flashExtraY = -2;
                                    break;
                                case 2:
                                    document.getElementById("ringo-bullet").style.transform = "translate(2rem, 4rem) rotateZ(50deg)";
                                    flashExtraY = -2;
                                    break;
                            }
                            let bulletY = 0;
                            let bulletX = 0;
                            let bulletMover = setInterval(() => {
                                bulletY -= 0.75;
                                bulletX += 0.6;
                                document.getElementById("ringo-bullet").style.top = bulletY + "rem";
                                document.getElementById("ringo-bullet").style.left = bulletX * boardStatus.enemy.currentCharacter + "rem";
                            }, 10);
                            //on Impact
                            setTimeout(() => {
                                clearInterval(bulletMover);
                                let flashY = document.getElementById("ringo-bullet").style.top;
                                let flashX = document.getElementById("ringo-bullet").style.left;
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprites_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                document.getElementById("ringo-flash").style.top = parseFloat(flashY) + flashExtraY + "rem";
                                console.log(flashX);
                                document.getElementById("ringo-flash").style.left = flashX;
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                increaseEnergy();
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 50);
                            }, 250);
                        }, 2200);
                        break;
                    case 2: 
                        let audio3 = new Audio('assets/Sounds_03a_Ringo.mp3');
                        audio3.volume = 0.5;
                        audio3.play();
                        setTimeout(() => {
                            //Spawn effects
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-ult' class='ringo-ult ringo-ult-" + boardStatus.player.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprites_03a_Ringo.png' /></div><div id='ringo-flask' class='ringo-flask'><img src='assets/Sprites_04a_Ringo.png' /></div><div id='ringo-fire-ring'><img src='assets/Sprites_05a_Ringo.png' /></div><div id='dragon-trails'></div>";  
                            //timer to remove the above effects
                            setTimeout(() => {
                                clearInterval(dragonUpdate);
                                clearInterval(smokeTrails);
                                document.getElementById("ringo-ult").remove();
                                document.getElementById("ringo-flask").remove();
                                document.getElementById("ringo-fire-ring").remove();
                                document.getElementById('dragon-trails').remove();
                            }, 2900);
                            
                            let dragonUpdate;
                            let smokeTrails;
                            let dragonExtraX = 0.4;
                            let dragonExtraAngle = 0.5;
                            let dragonArc = 10;
                            switch(boardStatus.enemy.currentCharacter) {
                                case 0:
                                    break;
                                case 1:
                                    dragonArc = 12;
                                    dragonExtraX = -0.3;
                                    dragonExtraAngle = 0.6;
                                    break;
                                case 2:
                                    dragonArc = 15;
                                    dragonExtraX = -0.8;
                                    dragonExtraAngle = 0.7;
                                    break;
                            }
                            setTimeout(() => {

                                let dragonX = 0;
                                let dragonY = 0;
                                let dragonAngle = -45;
                                let dragonSize = 0;
                                dragonUpdate = setInterval(() => {
                                    dragonY -= 0.13;
                                    dragonX = dragonArc * Math.sin(0.2 * dragonY) + dragonY * dragonExtraX;
                                    dragonSize = 1.5 * Math.sin(0.05 * dragonY);
                                    dragonAngle += dragonExtraAngle;
                                    console.log(dragonY);
                                    document.getElementById('ringo-ult').style.top = dragonY + "rem";
                                    document.getElementById('ringo-ult').style.left = dragonX + "rem";
                                    document.getElementById('ringo-ult').style.transform = "translate(-8rem, 5rem) rotate(" + dragonAngle +"deg) scale("+ -dragonSize + ")";
                                }, 10);

                                let smokesCount = 0;
                                let smokeScales = [];
                                let smokeOpacities = [];
                                let smokeBrightness = [];
                                let smokeTrailExtraY = 0.5;
                                smokeTrails = setInterval(() => {
                                    let random = Math.random() * (360 - 0 + 1) + 0;
                                    smokeScales.push(1);
                                    smokeOpacities.push(1);
                                    smokeBrightness.push(1);
                                    document.getElementById('dragon-trails').innerHTML += "<img id='smokeTrail-" + smokesCount + "' style='top:" + (dragonY - smokeTrailExtraY) + "rem; left: " + dragonX + "rem;'' class='dragon-trails' src='assets/Sprites_01a_Fire.png'/>";
                                    for(let i=0; i <= smokesCount; i++) {
                                        smokeScales[i] -= 0.03;
                                        smokeOpacities[i] -= 0.06;
                                        smokeBrightness[i] -= 0.08;
                                        document.getElementById('smokeTrail-' + i).style.transform = "translate(-2rem, 8rem) rotate(" + random + "deg) scale(" + smokeScales[i] + ")";
                                        document.getElementById('smokeTrail-' + i).style.opacity = smokeOpacities[i];
                                        document.getElementById('smokeTrail-' + i).style.filter = "drop-shadow(0 0 20px rgb(255, 94, 0)) brightness(" + smokeBrightness[i] + ")";
                                    }
                                    smokesCount += 1;
                                }, 50);
                            }, 1200);
                            
                            setTimeout(() => {
                                //on Impact
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-explosion' class='ringo-explosion'><img id='ringo-explosion-img'  src='assets/Gif_01a_Ringo.gif' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-explosion-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                reduceEnergy(3);
                                //timing the shake effect
                                setTimeout(() => {
                                    shakeScreen();
                                }, 125); 
                                setTimeout(() => {smokeTrails
                                    document.getElementById("ringo-explosion").remove();
                                }, 1200);
                            }, 2800)
                        }, 300);
                        break;
                }
                break;
            case ADAGIO:
                switch(skillIndex) { 
                    case 0: 
                        doDamageToEnemy(characters[ADAGIO].skills[skillIndex].dmg);
                        summon(GIFT_OF_FIRE);
                        setTimeout(() => increaseEnergy(), 500);
                        break;
                    case 1: 
                        doDamageToEnemy(characters[ADAGIO].skills[skillIndex].dmg);
                        setTimeout(() => increaseEnergy(), 500);
                        break;
                    case 2: 
                        doDamageToEnemy(characters[ADAGIO].skills[skillIndex].dmg);
                        setTimeout(() => reduceEnergy(), 500);
                        break;
                }
                break;
            case JOULE:
            switch(skillIndex) { 
                case 0: 
                    doDamageToEnemy(characters[JOULE].skills[skillIndex].dmg);
                    summon(GIFT_OF_FIRE);
                    setTimeout(() => increaseEnergy(), 500);
                    break;
                case 1: 
                    doDamageToEnemy(characters[JOULE].skills[skillIndex].dmg);
                    setTimeout(() => increaseEnergy(), 500);
                    break;
                case 2: 
                    doDamageToEnemy(characters[JOULE].skills[skillIndex].dmg);
                    setTimeout(() => reduceEnergy(), 500);
                    break;
            }
            break;
        }
    }

</script>

<div class="skills">
    {#each characters[boardStatus.player.currentCharacter].skills as skill, i}
    {#if i == characters[boardStatus.player.currentCharacter].skills.length - 1}
        <button class="skill" class:usable={boardStatus.player.characters[boardStatus.player.currentCharacter].energy == characters[boardStatus.player.currentCharacter].ultimateCost} on:click={() => useSkill(i)}>
            <img src={skill.img} alt="">
        </button>
    {:else}
        <button class="skill" class:usable={true} on:click={() => useSkill(i)}>
            <img src={skill.img} alt="">
        </button>
    {/if}
        
    {/each}
</div>

<style>
    .skills {
        display: flex;
    }
    .skill {
        background: none;
        margin-right: 1rem;
        border-radius: 12px;
        transition: 0.25s;
        cursor: pointer;
        box-shadow: 0 0 0 4px gray;
        filter: brightness(0.7);
    }
    .usable {
        filter: brightness(1);
    }
    .usable:hover {
        box-shadow: 0 0 0 2px #F2C94C;
    }
    .skill img {
        display: block;
        width: 60px;
        height: auto;
        border-radius: 12px;
    }
</style>