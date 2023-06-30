<script>
    import GiftOfFire from '../summons/GiftOfFire.svelte';
    import {gameStatus} from '../stores'
    import PlayerCharacterCard from './PlayerCharacterCard.svelte'
    import CharacterSkills from './CharacterSkills.svelte';
    import EnemyCharacterCard from './EnemyCharacterCard.svelte';

    let boardStatus;
    let selectedCharacter = null;

    gameStatus.subscribe(value => {
		boardStatus = value;
	});

    function selectCharacter(index) {
        selectedCharacter = index;
    }

    function playerSwitch() {
        let newStatus = boardStatus;
        newStatus.player.currentCharacter = selectedCharacter;
        newStatus.player.canSwitch = false;
        selectedCharacter = null;
        gameStatus.update(status => newStatus); 
    }

    function allowSwitch() {
        let newStatus = boardStatus;
        newStatus.player.canSwitch = true;
        gameStatus.update(status => newStatus);
    }

    function swapEnemy() {
        let newStatus = boardStatus;
        if(boardStatus.enemy.currentCharacter + 1 > 2) newStatus.enemy.currentCharacter = 0;
        else newStatus.enemy.currentCharacter++;
        gameStatus.update(status => newStatus);
    }

    function endRound() {
        
    }
    //Summons ID
    const GIFT_OF_FIRE = 0;
</script>

<div id="board">
    <div class="bottom-row"><button on:click={() => swapEnemy()} class="switch">
        <img class="main-img" src="assets/Icons_01a_Switch.svg" alt="">
    </button></div>
    <div class="characters">
        <div class="enemy">
            {#each boardStatus.enemy.characters as character, i}
                <button id={"enemy-character-" + i} class:active={boardStatus.enemy.currentCharacter == boardStatus.enemy.characters[i].id}>
                    <EnemyCharacterCard index={i} />
                </button>
            {/each}
        </div>
        <div class="player">
            {#each boardStatus.player.characters as character, i}
                <button id={"player-character-" + i} on:click={() => {
                    console.log(i);
                    if(boardStatus.player.currentCharacter != i) {
                        if(boardStatus.player.canSwitch) {{
                            selectCharacter(i);
                        }}
                        else {
                            allowSwitch();
                        }
                    } 
                }} class:active={boardStatus.player.currentCharacter == boardStatus.player.characters[i].id}>
                    <PlayerCharacterCard index={i} />
                </button>
            {/each}
        </div>
    </div>
    <div class="col-3">
        <div class="points">
        </div>
        <div class="summons">
            <div class="enemy"></div>
            {#if boardStatus.player.summons.length > 0}
                <div class="player">
                    {#if boardStatus.player.summons.some(summon => summon.id === GIFT_OF_FIRE)}
                        <GiftOfFire />
                    {/if}
                </div>
            {/if}
        </div>
        <div class="bottom-row">
            <CharacterSkills />
            {#if boardStatus.player.canSwitch}
                <button on:click={() => {
                    if(selectedCharacter != null) {
                        playerSwitch();
                    }
                }} class="switch">
                    <img class="main-img" src="assets/Icons_01a_Switch.svg" alt="">
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    #board {
        user-select: none;
        padding: 2rem;
        width: 1440px;
        height: 700px;
        display: grid;
        grid-template-columns: 25% 50% 25%; 
        padding: 1rem 0;
        background: #4F4F4F;
        overflow: hidden;
    }

    .characters {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .characters > div {
        display: flex;
        justify-content: space-around;
    }
    .characters > .enemy {
        align-items: flex-start;
    }
    .characters > .player {
        align-items: flex-end;
    }
    .characters button {
        background: transparent;
        padding: 0;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }
    .characters .player > button.active {
        transform: translateY(-2rem);
    }
    .characters .enemy > button.active {
        transform: translateY(2rem);
    }


    .col-3 {
        display: grid;
        grid-template-rows: 1fr 6fr 1fr;
    }

    .summons {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .summons .player {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-start;
    }

    .bottom-row {
        display: flex;
        align-items: center;
    }
    .bottom-row > .switch {
        background: transparent;
        display: grid;
        place-items: center;
        cursor: pointer;
    }
    .bottom-row > .switch img{
        width: 50px;
        aspect-ratio: 1/1;
        filter: invert(72%) sepia(78%) saturate(547%) hue-rotate(0deg) brightness(104%) contrast(103%) drop-shadow(0 0 3px gold);
        border-radius: 50%;
        animation: switchPopUp 0.4s ease-in-out;
        animation-fill-mode: forwards;
    }
    @keyframes switchPopUp {
        0% { 
            transform: scale(0.4);
            opacity: 0;
        }
        40% {
            opacity: 1;
            transform: scale(1);
        }
        100% { 
        }
    }
</style>