<script>
    import { charactersData } from '../stores';
    import { gameStatus } from '../stores';
    import tilt from '../lib/tilt';

    export let index;

    let boardStatus;
    let characters;

    charactersData.subscribe(value => {
		characters = value;
	});

    gameStatus.subscribe(value => {
		boardStatus = value;
        console.log(boardStatus.enemy.characters);
	});


</script>

<div style="position: relative;">
    <div class="card" use:tilt={{ scale: 1.1, reverse: true }}>
        <img src={characters[boardStatus.enemy.characters[index].id].cardImg} alt="">
        <img src="assets/CardFrames_01b_Gold.png" alt="">
        <div class="hp">
            <h1>{boardStatus.enemy.characters[index].hp}</h1>
            <img src="assets/CardAttributes_01a_Health.png" alt="">
        </div>
        <div class="energy">
            {#each {length: characters[boardStatus.enemy.characters[index].id].ultimateCost} as _, i}
                <div class="energy-slot">
                    {#if i < boardStatus.enemy.characters[index].energy}
                        <img src="assets/CardAttributes_02a_Energy.png" alt="">
                    {:else}
                        <img class="empty" src="assets/CardAttributes_02b_Energy.png" alt="">
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <div id={"effect-enemy-" + index} class="character-card-effect"></div>
</div >

<style>
    .card {
        background: none;
        position: relative;
        width: 150px;
        aspect-ratio: 7 / 12;
    }
    .card > img{
        position: absolute;
        display: block;
        width: 100%;
        height: auto;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; 
        -ms-transform: translateZ(0); /* IE 9 */
        -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
        transform: translateZ(0);
    }
    .hp {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        display: grid;
        place-items: center;
    }
    .hp h1 {
        text-shadow: -1px 1px 2px #000,
				  1px 1px 2px #000,
				  1px -1px 0 #000,
				  -1px -1px 0 #000;
        position: absolute;
        font-weight: normal;
        font-size: 1.8rem;
        color: white;
        font-family: 'Vg Bold';
        z-index: 1;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; 
        -ms-transform: translateZ(0); /* IE 9 */
        -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
        transform: translateZ(0);
    }
    .hp img {
        position: absolute;
        width: 80px;
        height: auto;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; 
        -ms-transform: translateZ(0); /* IE 9 */
        -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
        transform: translateZ(0);
    }
    .energy {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: -1.4rem;
        margin-top: 0.75rem;
        display: flex;
        flex-direction: column;
    }
    .energy-slot {
        margin-top: -0.75rem;
    }
    .energy-slot img{
        width: 45px;
        height: auto;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; 
        -ms-transform: translateZ(0); /* IE 9 */
        -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
        transform: translateZ(0);
    }
</style>