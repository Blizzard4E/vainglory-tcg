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
        gameStatus.update(status => newStatus);
    }

</script>

<div class="board">
    <div></div>
    <div class="characters">
        <div class="enemy">
            {#each boardStatus.enemy.characters as character, i}
                <CharacterCard bind:status={boardStatus.enemy.characters[i]} />
            {/each}
        </div>
        <div class="player">
            {#each boardStatus.player.characters as character, i}
                <CharacterCard bind:status={boardStatus.player.characters[i]} />
            {/each}
        </div>
    </div>
    <div class="col-3">
        <div class="points">
        </div>
        <div class="bottom-row">
            <CharacterSkills />
            <button on:click={() => playerSwitch()} class="switch">
                <img src="assets/Icons_01a_Switch.svg" alt="">
            </button>
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
    }
    .bottom-row > .switch img{
        width: 50px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 3px solid white;
        filter: invert(97%) sepia(64%) saturate(1625%) hue-rotate(319deg) brightness(102%) contrast(90%);
        padding: 0.5rem;
    }
</style>