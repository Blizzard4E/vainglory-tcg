<script>
    import {gameStatus} from '../stores'
    import CharacterCard from './CharacterCard.svelte'
    import CharacterSkills from './CharacterSkills.svelte';

    let boardStatus;

    gameStatus.subscribe(value => {
		boardStatus = value;
	});

    function playerSwitch() {
        let newStatus = boardStatus;
        if(boardStatus.player.currentCharacter == boardStatus.player.characters.length - 1) {
            newStatus.player.currentCharacter = 0;
        }
        else newStatus.player.currentCharacter++;
        newStatus.player.showSwitch = false;
        gameStatus.update(status => newStatus);
    }

    function showSwitch() {
        let newStatus = boardStatus;
        newStatus.player.showSwitch = true;
        gameStatus.update(status => newStatus);
    }

</script>

<div class="board">
    <div></div>
    <div class="characters">
        <div class="enemy">
            {#each boardStatus.enemy.characters as character, i}
                <button class:active={boardStatus.enemy.currentCharacter == boardStatus.enemy.characters[i].id}>
                    <CharacterCard bind:status={boardStatus.enemy.characters[i]} />
                </button>
            {/each}
        </div>
        <div class="player">
            {#each boardStatus.player.characters as character, i}
                <button on:click={() => {
                    if(boardStatus.player.currentCharacter != boardStatus.player.characters[i].id) showSwitch()
                }} class:active={boardStatus.player.currentCharacter == boardStatus.player.characters[i].id}>
                    <CharacterCard bind:status={boardStatus.player.characters[i]} />
                </button>
            {/each}
        </div>
    </div>
    <div class="col-3">
        <div class="points">
        </div>
        <div class="bottom-row">
            <CharacterSkills />
            {#if boardStatus.player.showSwitch}
                <button on:click={() => playerSwitch()} class="switch">
                    <img src="assets/Icons_01a_Switch.svg" alt="">
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    .board {
        width: 1400px;
        height: 700px;
        display: grid;
        grid-template-columns: 25% 50% 25%; 
        color: red;
        padding: 1rem 0;
    }

    .characters {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #4F4F4F;
    }
    .characters > div {
        display: flex;
        justify-content: space-around;
    }
    .characters button {
        background: transparent;
        padding: 0;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }
    .player > button.active {
        transform: translateY(-2rem);
    }
    .enemy > button.active {
        transform: translateY(2rem);
    }


    .col-3 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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