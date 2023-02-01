<script lang="ts">
  import {
    GRID_PADDING,
  } from '../../constants';

  export let colour: string;
  export let id: string;

  export let gridSize: number;
  export let useGrid: boolean;

  export let offsetBlocks: number;
  export let widthBlocks: number;
  export let heightBlocks: number;
</script>

{#if useGrid}
  <pattern id="pattern-grid-{id}" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
    <rect
      x={GRID_PADDING / 2}
      y={GRID_PADDING / 2}
      width={gridSize - GRID_PADDING}
      height={gridSize - GRID_PADDING}
      fill={colour}
    >
  </pattern>
{/if}

<rect
  x={0}
  y={offsetBlocks * gridSize}
  height={heightBlocks * gridSize}
  width={widthBlocks * gridSize}
  fill={colour}
  opacity={0.5}
/>
<rect
  x={0}
  y={offsetBlocks * gridSize}
  height={heightBlocks * gridSize}
  width={widthBlocks * gridSize}
  fill={useGrid ? `url(#pattern-grid-${id})` : colour}
/>
