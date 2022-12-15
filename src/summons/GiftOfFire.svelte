<script>
    import { gameStatus } from '../stores';
    let boardStatus;

    gameStatus.subscribe(value => {
		boardStatus = value;
	});
</script>

<div class="summon">
    <img src="assets/Summons_01a_Adagio.png" alt="">
</div>

<style>
    .summon {
        border-radius: 12px;
    }
    .summon img {
        border-radius: 12px;
        width: 80px;
        height: auto;
    }
</style>