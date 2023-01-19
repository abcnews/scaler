<script lang="ts">
  import Grid from './Chart/Grid.svg.svelte';

  import { NUM_COLUMNS, COLOURS, SQUARE_VALUE } from '../constants';

  export let width: number;
  export let value: number;

  $: gridSize = Math.floor(width / NUM_COLUMNS);
  $: numBlocks = (value / 1000) / SQUARE_VALUE;
  $: heightBlocks = Math.min(1, Math.max(numBlocks, 0.04));
</script>

<div class="wrapper">
  <p>
    ${value / 1000} million
  </p>

  <div
    style="
      width:{Math.max(numBlocks * gridSize, gridSize)}px;
      height:{heightBlocks * gridSize + 10}px;
      margin: auto;
    "
  >
    <svg style="width:100%;height:100%">
      <Grid
        {gridSize}
        useGrid={numBlocks > 1}

        offsetBlocks={0}
        widthBlocks={Math.max(numBlocks, 0.04)}
        {heightBlocks}
        colour={COLOURS.bg}
      />
    </svg>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;

    p {
      font-family: ABCSans;
      font-weight: 700;
      text-align: center;
      margin-bottom: 5px;
    }
  }
</style>
