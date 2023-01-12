<script lang="ts">
  import { LayerCake } from 'layercake';
  import { NUM_COLUMNS, SQUARE_VALUE } from '../../constants';

  import Blocks from './Blocks.svg.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  export let padding = { top: 0, bottom: 0, left: 0, right: 0 };
  const TOTAL_VALUE = 243_000_000;

  $: numSquares = TOTAL_VALUE / SQUARE_VALUE;
  $: numRows = Math.ceil(numSquares / NUM_COLUMNS);
  $: gridSize = Math.floor(width / NUM_COLUMNS)
  $: height = numRows * gridSize;

  export let data: any[];
</script>

<div
  class="chart-container"
  style="
    width: {width}px;
    height: {height}px;
    margin: auto;
  ">

  {#if width && height}
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      yDomain={[0, numRows]}
      yRange={[0, height]}
      {data}
    >

      <Blocks />
    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
