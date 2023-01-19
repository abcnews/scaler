<script lang="ts">
  import { LayerCake, Html } from 'layercake';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  import { TOTAL_VALUE, NUM_COLUMNS, SQUARE_VALUE, FIRST_DIVIDER, FIRST_DIVIDER_ROWS } from '../../constants';

  import Blocks from './Blocks.svg.svelte';
  import Divider from './Divider.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  export let zoomOut = false;
  export let padding = { top: 0, bottom: 0, left: 0, right: 0 };

  const numSquares = TOTAL_VALUE / SQUARE_VALUE;
  const numRows = Math.ceil(numSquares / NUM_COLUMNS);

  const h = tweened(20 * numRows, {
		duration: 1200,
		easing: cubicOut
	});

  let w: number;
  let gridSize: number;

  // When zooming out, we fit it to the viewport height rather than width
  $: {
    if (zoomOut) {
      h.set(window.innerHeight - 150);
      gridSize = $h / numRows;
      w = gridSize * NUM_COLUMNS;
    } else {
      w = width;
      gridSize = Math.floor(w / NUM_COLUMNS)
      h.set((numRows + FIRST_DIVIDER_ROWS) * gridSize);
    }
  }

  $: gridOverflow = w - gridSize * NUM_COLUMNS;
  $: dividerLineOffset = Math.floor((window.innerHeight / 5) / gridSize);

  export let data: any[];
</script>

<div
  class="chart-container"
  style="
    width: {w}px;
    height: {$h}px;
    margin: auto;
  ">

  {#if width && h}
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      yDomain={[0, numRows]}
      yRange={[0, $h]}
      {data}
    >

      <Blocks
        {gridSize}
        {gridOverflow}
        {zoomOut}
        {dividerLineOffset}
      />

      <Html>
        {#if !zoomOut}
          <Divider
            offsetValue={FIRST_DIVIDER}
            lineOffset={dividerLineOffset}
            length={FIRST_DIVIDER_ROWS}
            {gridSize}
            {gridOverflow}
            label="$53 BILLION"
          />
        {/if}
      </Html>

    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
