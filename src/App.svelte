<script lang="ts">
    import GameBoard from './components/GameBoard.svelte'
</script>

<main class="container"> 
    <GameBoard />
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        background: #333333;
        display: grid;
        place-items: center;
        overflow: hidden;
    }
</style>