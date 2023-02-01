<script lang="ts">
  import { LayerCake, Html } from 'layercake';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  import { TOTAL_VALUE, NUM_COLUMNS, SQUARE_VALUE, DIVIDER_VALUE, DIVIDER_ROWS } from '../../constants';

  import Blocks from './Blocks.svg.svelte';
  import Divider from './Divider.svelte';
  import ZoomedOutLabels from './ZoomedOutLabels.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  export let labels: any[];
  export let padding = { top: 0, bottom: 0, left: 0, right: 0 };

  export let zoomOut = false;
  export let showArrow = false;
  export let showRedBelowDivider = false;

  const numSquares = TOTAL_VALUE / SQUARE_VALUE;
  const numRows = Math.ceil(numSquares / NUM_COLUMNS);

  // The shrinking height gives the zoom-out effect, as the width & gridSize shrink with it
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
      h.set((numRows + DIVIDER_ROWS) * gridSize);
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
    top: 30px;
    position: {zoomOut ? 'sticky' : 'static'};
    transition: transform 800ms;
    margin: auto;
  ">

  {#if gridSize}
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
        {dividerLineOffset}
        {labels}
        {zoomOut}
      />

      <Html>
        {#if !zoomOut}
          <Divider
            offsetValue={DIVIDER_VALUE}
            lineOffset={dividerLineOffset}
            length={DIVIDER_ROWS}
            {showRedBelowDivider}
            {showArrow}
            {gridSize}
            {gridOverflow}
          />
        {/if}

        {#if zoomOut}
          <ZoomedOutLabels {gridSize} />
        {/if}
      </Html>

    </LayerCake>
  {/if}
</div>

<!-- wrapper to make it take a second to scroll out of the viz when zoomed out -->
{#if zoomOut}
  <div class="panel-container" />
{/if}

<style lang="scss">
  .panel-container {
    height: 35vh;
  }
</style>
