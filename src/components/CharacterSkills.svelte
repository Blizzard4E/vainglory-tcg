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
    const RINGO = 0, ADAGIO = 1;
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

    function useSkill(skillIndex) {
        switch(boardStatus.player.currentCharacter){
            case RINGO:
                switch(skillIndex) { 
                    case 0: 
                        let audio1 = new Audio('assets/Sounds_01a_Ringo.mp3');
                        audio1.volume = 0.4;
                        audio1.play();
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet ringo-bullet-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_01a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprite_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                increaseEnergy();
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 200);
                            }, 250);
                        }, 100);
                        break;
                    case 1: 
                        let audio2 = new Audio('assets/Sounds_02a_Ringo.mp3');
                        audio2.volume = 0.5;
                        audio2.play();
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet ringo-bullet-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_01a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprite_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 200);
                            }, 250);
                        }, 400);
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet ringo-bullet-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_01a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprite_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 200);
                            }, 250);
                        }, 1000);
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet ringo-bullet-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_01a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprite_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 200);
                            }, 250);
                        }, 1800);
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-bullet' class='ringo-bullet ringo-bullet-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_01a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-bullet").remove();
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-flash' class='ringo-flash'><img id='ringo-flash-img'  src='assets/Sprite_02a_Ringo.png' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-flash-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                increaseEnergy();
                                setTimeout(() => {
                                    document.getElementById("ringo-flash").remove();
                                }, 200);
                            }, 250);
                        }, 2200);
                        break;
                    case 2: 
                        let audio3 = new Audio('assets/Sounds_03a_Ringo.mp3');
                        audio3.volume = 0.5;
                        audio3.play();
                        setTimeout(() => {
                            document.getElementById("effect-player-" + boardStatus.player.currentCharacter).innerHTML += "<div id='ringo-ult' class='ringo-ult ringo-ult-" + boardStatus.enemy.currentCharacter +"-" + boardStatus.enemy.currentCharacter + "'><img src='assets/Sprite_03a_Ringo.png' /></div><div id='ringo-flask' class='ringo-flask'><img src='assets/Sprite_04a_Ringo.png' /></div>";
                            setTimeout(() => {
                                document.getElementById("ringo-ult").remove();
                                document.getElementById("ringo-flask").remove();
                            }, 2900);
                            setTimeout(() => {
                                document.getElementById("effect-enemy-" + boardStatus.enemy.currentCharacter).innerHTML += "<div id='ringo-explosion' class='ringo-explosion'><img id='ringo-explosion-img'  src='assets/Gif_01a_Ringo.gif' /></div>";
                                let random = Math.random() * (360 - 0 + 1) + 0;
                                document.getElementById("ringo-explosion-img").style.transform = "rotateZ(" + random + "deg)";
                                doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                                reduceEnergy(3);
                                setTimeout(() => {
                                    document.getElementById("ringo-explosion").remove();
                                }, 1200);
                            }, 2800)
                        }, 300)
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