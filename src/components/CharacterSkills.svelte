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
        console.log(summons[summonID]);
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
                        doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                        setTimeout(() => increaseEnergy(), 500);
                        break;
                    case 1: 
                        doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                        setTimeout(() => increaseEnergy(), 500);
                        break;
                    case 2: 
                        doDamageToEnemy(characters[RINGO].skills[skillIndex].dmg);
                        setTimeout(() => reduceEnergy(), 500);
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